import sys
import math
import time
import subprocess
import time
import os
# import pandas as pd

current_location = os.path.dirname(__file__)
num_of_alg = 3

def File_to_str(file: str):
    with open(os.path.join(current_location, file), 'r', encoding='utf-8') as file:
        content = file.read()
    return content

def read_java_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        return content
    except FileNotFoundError:
        return "File not found."
    except Exception as e:
        return f"An error occurred: {e}"

def Str_to_file(code: str):
    java_file_path = os.path.join(current_location, "Temp.java")
    f = open(java_file_path, "w")
    f.write(code)
    f.close()
    return

def modify_java_code():
    target_file = os.path.join(current_location, "Temp.java")
    fixed_file = os.path.join(current_location, "Fixed.java")
    
    for i in range(1, num_of_alg + 1):
        location = os.path.join(current_location, "example" + str(i), "src")
        print(location)
        print("Detetction %d start" %i)
        subprocess.run("javac Main.java", shell=True, cwd=location)
        subprocess.run(["java", "-cp", location, "Main", target_file, fixed_file], capture_output=True, shell=True, cwd=location)
        print("Detection Done")
        print()
        target_file = fixed_file
        
    return [], []

def excute_java_code(file: str):
    compile_process = subprocess.run(["javac", file + ".java"], capture_output=True, shell=True, cwd=current_location)
    
    if compile_process.returncode != 0:
        print("Java compilation failed:", compile_process.stderr.decode("utf-8"))
        return [False, compile_process.stderr.decode("utf-8"), 0, 0]

    start = time.time()
    execute_process = subprocess.run(["java", "-cp", current_location, file], capture_output=True, shell=True, cwd=current_location)
    end = time.time()
    
    if execute_process.returncode != 0:
        print("Java execution failed:", execute_process.stderr.decode("utf-8"))
        return [False, execute_process.stderr.decode("utf-8"), 0, 0]

    # 실행 결과 출력
    print("Java execution output:", execute_process.stdout.decode("utf-8"))
    
    return [True, execute_process.stdout.decode("utf-8"), (end - start), 0]

# Time_origin = excute_java_code(current_location+"Temp.java")

# modify_java_code()

# Time_fixed = excute_java_code(current_location+"Fixed.java")

# print("Time_origin %4f" %Time_origin)
# print("Time_fixed %4f" %Time_fixed)


