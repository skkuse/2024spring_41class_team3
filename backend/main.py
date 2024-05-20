# main.py
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel

from db.database import *
from db.models import *
from db.schema import *
from db.crud import *

import subprocess
import os

Base.metadata.create_all(bind=engine)

app = FastAPI()

#fast api와 sqlalchemy를 연결하는 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
    # 자바 코드를 수정하여 주석을 추가
    modified_code = modify_java_code(java_code.code)
    # 수정된 코드를 실행
    result = execute_java_code(modified_code)
    return {"result": result}

def modify_java_code(code: str) -> str:
    # 자바 코드를 수정하는 로직
    return f"{code}\n// 수정됨 ^.^"

def execute_java_code(code: str) -> str:
    # 수정된 자바 코드를 실제로 실행하는 로직
    file_path = "Main.java"
    
    # 자바 코드를 파일에 저장
    with open(file_path, "w") as file:
        file.write(code)
    
    try:
        # 자바 파일 컴파일
        compile_process = subprocess.run(["javac", file_path], capture_output=True, text=True)
        
        if compile_process.returncode != 0:
            return f"Compilation failed: {compile_process.stderr}"
        
        # 자바 프로그램 실행
        run_process = subprocess.run(["java", "Main"], capture_output=True, text=True)
        
        if run_process.returncode != 0:
            return f"Execution failed: {run_process.stderr}"
        
        return run_process.stdout
    finally:
        # 임시 파일 정리
        if os.path.exists(file_path):
            os.remove(file_path)
        if os.path.exists("Main.class"):
            os.remove("Main.class")
