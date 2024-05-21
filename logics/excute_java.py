import sys
import math
import time
import subprocess
import time
import pandas as pd

current_location = "/home/ihmhyunsir/logics/"
num_of_alg = 3 

def Str_to_file(code:str):
    f = open("Temp"+".java","w")
    f.write(code)
    f.close()
    return

def modify_java_code():
    target_file = current_location + "Temp.java"
    fixed_file = current_location+"Fixed.java"
    for i in range(1,num_of_alg+1):
        location = "/home/ihmhyunsir/logics/example"+ str(i) + "/src/"
        print("Detetction %d start" %i)
        subprocess.run("javac Main.java", shell=True, cwd=location)
        subprocess.run("java Main "+ target_file +" "+ current_location+"Fixed.java", shell=True, cwd=location)
        print("Detection Done")
        print("\n")
        target_file = fixed_file
    return

def excute_java_code(path:str):
    #compile
    subprocess.run("javac "+path, shell=True, cwd=current_location) # cwd는 현재 디렉토리를 의미하는 걸로, cd라고 생각하시면 됩니다
    # Measure time
    start = time.time()
    subprocess.run("java Temp", shell=True, cwd=current_location) # 시간 측정
    end = time.time()
    return end - start

input_code = sys.argv[1]

print("input code : ",sys.argv[1])

Str_to_file(input_code)

Time_origin = excute_java_code(current_location+"Temp.java")

modify_java_code()

Time_fixed = excute_java_code(current_location+"Fixed.java")

print("Time_origin %4f" %Time_origin)
print("Time_fixed %4f" %Time_fixed)


