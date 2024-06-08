# main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from db.database import *
from db.models import *
from db.schema import *
from db.crud import *

from logics.excute_java import *
from logics.check_carbon import *
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from starlette.requests import Request


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#fast api와 sqlalchemy를 연결하는 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# React 빌드 결과물을 정적 파일로 서빙
app.mount("/static", StaticFiles(directory="../frontend/build/static"), name="static")

# 템플릿 디렉토리 설정
templates = Jinja2Templates(directory="../frontend/build")

@app.get("/", response_class=HTMLResponse)
async def serve_spa(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

"""
Response 200
{
"daily_visitor": integer,
"total_visitor": integer,
"total_reduction": float,
"countries": [
    {
        "id": integer, 
        "name": string,
        "total_reduction": float
    },
    ...
    ]
}
"""
@app.get("/api/default")
def cover(db: Session = Depends(get_db)):
    total_visitor, daily_visitor = get_visitor(db, date.today())
    print(total_visitor, daily_visitor)
    total_reduction, countries = get_country(db)
    print(total_reduction, countries)
    response_countries = convert_country(countries)
    print(response_countries)
    
    return DefaultResponse(
        daily_visitor=daily_visitor,
        total_visitor=total_visitor,
        total_reduction=total_reduction,
        countries=response_countries
    )
    

"""
1. /api/code -> post
Request
{
    "code": string ex) "import java.lang.reflect.Array;\nimport java.util.ArrayList;\n\npublic class Temp {\n    public static void main(String[] args) {\n        ArrayList<String> arr = new ArrayList<>(100000000);\n        for(int i = 0 ; i < 100000000; i++)\n            arr.add(\"Hello\");\n        for(int i=0; i<arr.size(); i++) {\n            arr.get(i);\n        }\n    }\n}"
    "country": string
}

Response 200
{
    "code_id": integer
    "runtime": float
    "memory": float
    "before_code": string
    "after_code": string
    "before_carbon": float
    "after_carbon": float
    "energy_needed": float
    "runtime_stdout": string
    "algorithm_types”: [ integer ]
    "change_lines": [ integer ]
    "stdout": string
}

Response 400 컴파일, 런타임 실패
{
    "stderr": string
}
"""
@app.post("/api/code")
def code(request: CodeRequest, db: Session = Depends(get_db)):
    Str_to_file(request.code)
    result, stdout, runtime = excute_java_code("Temp")
    country = get_country_by_name(db, request.country)
    
    # Temp 정상 작동
    if result:
        before_carbon, energy_needed, memory = check_carbon(runtime, request.country)
        algorithm_types, change_lines = modify_java_code()
        
        code = Code(
            runtime=runtime,
            memory=memory,
            before_code=request.code,
            after_code=request.code,
            before_carbon=before_carbon,
            after_carbon=before_carbon,
            github_id=None,
            date=date.today(),
            energy_needed=energy_needed,
            stdout=stdout,
            sharing=False,
            country_id=country.country_id,
        )
        
        response = CodeSuccessResponse(
            code_id=None,
            runtime=runtime,
            memory=memory,
            before_code=request.code,
            after_code=request.code,
            before_carbon=before_carbon,
            after_carbon=before_carbon,
            energy_needed=energy_needed,
            stdout=stdout,
            algorithm_types=algorithm_types,
            change_lines=change_lines,
        )
        
        if not algorithm_types:
            code.code_id = add_code(db, code)
            response.code_id = code.code_id
            return response
            
        result, stdout, runtime = excute_java_code("Fixed")
        if result:
            code.after_carbon, code.energy_needed, _ = check_carbon(runtime, request.country)
            code.after_code = File_to_str("Fixed")
            
            code.code_id = add_code(db, code)
            
            response.code_id = code.code_id
            response.after_code = code.after_code
            response.after_carbon = code.after_carbon
            
            # mapping 저장
            add_mapping(db, code.code_id, algorithm_types)
            
            # imapping 저장
            add_imapping(db, code.code_id, change_lines)
            
            # country 저장
            update_country(db, country, (code.before_carbon - code.after_carbon))
            
            return response
        else: # Fixed 에러
            CodeErrorResponse(stderr=stdout)
            
    else: # Temp 에러
        return CodeErrorResponse(stderr=stdout)

"""
1. /api/sharing -> Post
Request
{
    "code_id": integer
    "anonymous": bool
    "github_id": str
}

Response
{
    "success": 200
}
"""
@app.post("/api/sharing")
def sharing(request: SharingRequest, db: Session = Depends(get_db)):
    sharing_code(db, request)
    return {"success": 200}

"""
Request

{

“algorithm_type”: integer

}

Response 200
{
    "codes": {
    "code_id": integer,
    "before_carbon": float,
    "after_carbon": float,
    "github_id": string,
    "runtime": float,
    "memory": float,
    }
}
"""
def convert_code(db: Session, codes: List[Code]):
    return [CodeResponse(id=code.code_id, 
            runtime=code.runtime,
            memory=code.memory,
            before_code=code.before_code,
            after_code=code.after_code,
            before_carbon=code.before_carbon,
            after_carbon=code.after_carbon,
            github_id=code.github_id,
            date=code.date,
            energy_needed=code.energy_needed,
            stdout=code.stdout,
            sharing=code.sharing,
            country_id=code.country_id,
            algorithm_types=get_mappings(db, code.code_id),
            change_lines=get_imappings(db, code.code_id)) for code in codes]
    
@app.get("/api/bulletin/{algorithm_type}")
def bulletin(algorithm_type: int, db: Session = Depends(get_db)):
    return BulletinResponse(codes=convert_code(db, [mapping.code for mapping in get_mapping(db, algorithm_type) if mapping.code.sharing]))

"""
Request

{

“code_id”: integer

}

Response 200
{
    "code": {
        "code_id": integer
        "runtime": float
        "memory": float
        "before_code": string
        "after_code": string
        "before_carbon": float
        "after_carbon": float
        "energy_needed": float
        "runtime_stdout": string
        "algorithm_types": [ integer ],
        "change_lines": [ integer ],
        "anonymous": bool,
        "github_id": string,
        }
}
"""
@app.get("/api/detail/{code_id}")
def detail(code_id: int,  db: Session = Depends(get_db)):
    code = get_code_by_id(db, code_id)
    if code:
        return CodeResponse(id=code.code_id,
                            runtime=code.runtime,
                            memory=code.memory,
                            before_code=code.before_code,
                            after_code=code.after_code,
                            before_carbon=code.before_carbon,
                            after_carbon=code.after_carbon,
                            github_id=code.github_id,
                            date=code.date,
                            energy_needed=code.energy_needed,
                            stdout=code.stdout,
                            sharing=code.sharing,
                            country_id=code.country_id,
                            algorithm_types=get_mappings(db, code.code_id),
                            change_lines=get_imappings(db, code.code_id))