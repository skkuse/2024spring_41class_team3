from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

# cover page
@app.get("/")
def home():
    return FileResponse("index.html")

@app.get("/bulletin")
def bulletin():
    return '게시판'

class JavaCode(BaseModel):
    code: str

@app.post("/run")
async def run_java_code(java_code: JavaCode):
    # 자바 코드를 실행하는 로직을 구현
    # 예를 들어, subprocess를 사용하여 외부 자바 컴파일러와 상호 작용
    modified_code = modify_java_code(java_code.code)
    result = execute_java_code(modified_code)
    return {"result": result}

def modify_java_code(code: str) -> str:
    # 자바 코드를 수정하는 로직
    return code.replace("original", "modified")

def execute_java_code(code: str) -> str:
    # 수정된 코드를 실제로 실행하는 로직
    return "Execution result"


# input code (post)

# before.java co2 => filtering 1, 2, 3 => time check, after.java co2 => db commit => return

# bulletin

# bulletin detail

# input code (post)
