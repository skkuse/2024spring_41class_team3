import sys
import math
import time
import subprocess
import time
import os
import re
# import pandas as pd

current_location = os.path.dirname(__file__)
num_of_alg = 5
NS = 1000000000
old_name = ""
def replace_class_name(java_code):
    # 클래스 이름을 추출하고 변경하는 정규표현식
    global old_name
    pattern = r'\bpublic\s+class\s+(\w+)\b'
    match = re.search(pattern, java_code)
    if match:
        old_name = match.group(1)
        updated_code = re.sub(pattern, f'public class Temp', java_code)
        return updated_code
    else:
        return java_code

def return_class_name(java_code):
    # 클래스 이름을 추출하고 변경하는 정규표현식
    global old_name
    print(old_name)
    pattern = r'\bpublic\s+class\s+(\w+)\b'
    match = re.search(pattern, java_code)
    if match:
        updated_code = re.sub(pattern, f'public class {old_name}', java_code)
        return updated_code
    else:
        return java_code
    
def add_timing_to_main(java_code):
    #main_start_pattern = r'public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*args\s*\)\s*{'
    main_start_pattern = r'public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*args\s*\)\s*(throws IOException)?\s*{'

    match = re.search(main_start_pattern, java_code)
    
    if match:
        start_index = match.end()
        timing_code = (
            '\n        long startTime = System.nanoTime();\n'  # 시작 시간 측정
        )
        
        # main 메서드의 끝을 찾기 위한 중괄호 짝 맞추기
        open_braces = 1
        end_index = start_index
        while open_braces > 0 and end_index < len(java_code):
            if java_code[end_index] == '{':
                open_braces += 1
            elif java_code[end_index] == '}':
                open_braces -= 1
            end_index += 1
        
        end_timing_code = (
            '        long endTime = System.nanoTime();\n'
            '        long duration = (endTime - startTime);\n'
            '        System.out.println();\n'
            '        System.out.print(duration);\n'
        )
        
        updated_code = (java_code[:start_index] + timing_code + java_code[start_index:end_index-1] + end_timing_code + java_code[end_index-1:])
        return updated_code
    return java_code

def remove_timing_code(code):
    # 시작 시간 측정 코드 패턴
    start_timing_pattern = (
        r'\s*long startTime = System\.nanoTime\(\);\n'
    )

    # 종료 시간 측정 코드 패턴
    end_timing_pattern = (
        r'\s*long endTime = System\.nanoTime\(\);\n'
        r'\s*long duration = \(endTime - startTime\);\n'
        r'\s*System.out.println\(\);\n'
        r'\s*System.out.print\(duration\);'
    )

    # 시작 시간 측정 코드 제거
    updated_code = re.sub(start_timing_pattern, '', code)
    
    # 종료 시간 측정 코드 제거
    updated_code = re.sub(end_timing_pattern, '', updated_code)
    
    return updated_code

def File_to_str(file: str):
    with open(os.path.join(current_location, file+".java"), 'r', encoding='utf-8') as file:
        content = file.read()
    update_content = remove_timing_code(content)
    update_content = return_class_name(update_content)
    return update_content

def Str_to_file(code: str):
    print(code)
    code = replace_class_name(code)
    code = add_timing_to_main(code)
    java_file_path = os.path.join(current_location, "Temp.java")
    f = open(java_file_path, "w")
    f.write(code)
    f.close()
    return

def changed_lines(temp_code, fixed_code):
    temp_code = remove_timing_code(temp_code).split("\n")
    fixed_code = remove_timing_code(fixed_code).split("\n")
    changed_lines = []
    #print(temp_code)
    #print(fixed_code)
    for i,line in enumerate(fixed_code):
        if line not in temp_code:
            if 'public class' in line:
                continue
            changed_lines.append(i+1)
    
    return changed_lines

def modify_java_code():
    print("\nModify_java_code")
    detection = False
    target_file = os.path.join(current_location, "Temp.java")
    fixed_file = os.path.join(current_location, "Fixed.java")
    algorithm_types = []
    change_lines = []

    for i in range(1, num_of_alg + 1):
        location = os.path.join(current_location, "example" + str(i), "src")
        print("Detetction %d start" %i)
        subprocess.run("javac Main.java", shell=True, cwd=location)
        fix_proc = subprocess.run("java " + "-cp " + location +" Main " + " " + target_file + " " + fixed_file, capture_output=True, shell=True, cwd=location)
        output = fix_proc.stdout.decode().split(" ")
        print("output:" , output)
        if len(output) > 2:      # output이 있을 시, Algorithm {num} Found line {num}\n 이라고 출력 / 없을 시 Not Found\n
            detection = True
            print("Found")
            algorithm_types.append(i)
            #change_lines.append(output[4][0])
            target_file = fixed_file
        print("Detection Done\n")
    
    if detection :
        target_file = os.path.join(current_location, "Temp.java")
        f = open(target_file)
        temp_code = f.read()
        f.close()
        f = open(fixed_file)
        fixed_code = f.read()
        f.close()
        change_lines = changed_lines(temp_code,fixed_code)
        
    return algorithm_types, change_lines

def excute_java_code(file: str):
    print("\nExcute_java_code")
    compile_process = subprocess.run("javac " + file + ".java", capture_output=True, shell=True, cwd=current_location)
    if compile_process.returncode != 0:
        print("Java compilation failed:", compile_process.stderr.decode("utf-8"))
        return [False, compile_process.stderr.decode("utf-8"), 0]
    # start = time.time()
    execute_process = subprocess.run("java " + "-cp " + current_location + " " + file, capture_output=True, shell=True, cwd=current_location)
    # end = time.time()
    if execute_process.returncode != 0:
        print("Java execution failed:", execute_process.stderr.decode("utf-8"))
        return [False, execute_process.stderr.decode("utf-8"), 0]
    

    runtime = int(execute_process.stdout.decode().split("\n")[-1]) / NS
    print("Java execution output: ",[True, execute_process.stdout.decode("utf-8"), runtime,0])
    # 실행 결과 출력
    #print("Java execution output:", execute_process.stdout.decode("utf-8"))
    return [True, execute_process.stdout.decode("utf-8"), runtime]

"""
_,_,runtime = excute_java_code("Temp")
print("Temp runtime : ",runtime)
modify_java_code()
_,_,fixed_runtime = excute_java_code("Fixed")
print("Temp runtime : ",fixed_runtime)
"""


