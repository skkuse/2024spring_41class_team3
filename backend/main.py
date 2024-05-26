# main.py
from fastapi import FastAPI, Depends

from db.database import *
from db.models import *
from db.schema import *
from db.crud import *

from logics.excute_java import *
from logics.check_carbon import *

Base.metadata.create_all(bind=engine)

app = FastAPI()

#fast api와 sqlalchemy를 연결하는 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello": "World"}

"""
Response 200
{
"daily_visitor": integer,
"total_visitor": integer,
"daily_reduction": float,
"total_reduction": float,
"countries": [
    {
        "id": integer, 
        "name": string,
        "daily_reduction": float,
        "total_reduction": float
    },
    ...
    ]
}
"""
@app.get("/api/default")
def cover(db: Session = Depends(get_db)):
    # visitor, country db조회
    pass

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
    result, stdout, runtime, memory = excute_java_code("Temp")
    print(result, stdout, runtime, memory)
    
    if result:
        before_carbon, energy_needed = check_carbon(runtime, memory, request.country)
        algorithm_types, change_lines = modify_java_code()
        
        # 변한게 없다? => 코드 db 저장, 바로 반환
        if not algorithm_types:
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
                country_id=1, #수정필요
            )
            code.code_id = add_code(db, code)
            
            return CodeSuccessResponse(
                code_id=code.code_id,
                runtime=runtime,
                memory=memory,
                before_code=request.code,
                after_code=request.code,
                before_carbon=before_carbon,
                after_carbon=before_carbon,
                energy_needed=energy_needed,
                stdout=stdout,
                algorithm_types=[],
                change_lines=[],
            )
            
        # 변한게 있다 => 코드 db, 국가 db 차이 저장,
        _, stdout, runtime, memory = excute_java_code("Fixed")
        after_carbon = check_carbon(runtime, memory, request.country)
        
        
    else:
        return CodeErrorResponse(stderr=stdout)
    """
    code를 Temp.java로 변환 str_to_code()
    
    exec함수 => Temp.java 컴파일/런타임 성공이면 (True, stdout, runtime, memory)반환, stderr시 (False, stdout, 0, 0)반환
    **stderr일 때 
    에러모델 생성
    에러메시지 바로 반환
    
    **stdout일 때
    응답모델 생성
    modify 함수 => temp.java =>> fixed.java, 반환 필요(algorithm_types, change_lines) ex) algorithm_types, change_lines = [1, 3], [22, 23, 24]
    
    **algorithm_types = [], change_lines = []일 경우
    Temp.java 탄소배출량 함수(runtime, memory) => (반환 필요: before_carbon, after_carbon, energy_needed)
    
    **패턴 걸린 경우
    exec함수 => Fixed.java 컴파일/런타임 성공이면 (True, runtime, memory)반환, stderr시 (False, 0, 0)반환
    
    Temp.java 탄소배출량 함수(runtime, memory) => (반환 필요: before_carbon, after_carbon, energy_needed)
    Fixed.java 탄소배출량 함수(runtime, memory) => (반환 필요: before_carbon, after_carbon, energy_needed)
    
    carbon_emission(runtime, memory)

    """

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
@app.get("/api/sharing")
def sharing(db: Session = Depends(get_db)):
    # code 조회
    pass

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
@app.get("/api/bulletin/{algorithm_type}")
def bulletin(algorithm_type: int, db: Session = Depends(get_db)):
    # mapping -> code 조회
    pass

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
def detail(code_id: int, db: Session = Depends(get_db)):
    pass
