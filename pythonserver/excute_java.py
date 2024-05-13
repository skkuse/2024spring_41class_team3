import math
import time
import subprocess
import time
import pandas as pd


target_file_location = "/home/ihmhyunsir/pythonserver/Temp.java" # 웹페이지로 들어온 inputfile
fixed_file_location = "/home/ihmhyunsir/pythonserver/Fixed.java" # 수정해서 나올 file   
# 파일의 위치는 서버에 맞게 변경하면 될 것 같아요 (이하 동일)

###########input file 탄소배출량 측정 과정(탄소배출량 공식을 아직 확인하진 못했는데, 실행 시간에 비례하는 걸로 알아서 실행시간을 측정하는 코드입니다)
#compile
subprocess.run("javac "+target_file_location, shell=True, cwd="/home/ihmhyunsir/pythonserver/") # cwd는 현재 디렉토리를 의미하는 걸로, cd라고 생각하시면 됩니다
# Measure time
start = time.time()
subprocess.run("java Temp", shell=True, cwd="/home/ihmhyunsir/pythonserver") # 시간 측정
end = time.time()

print("Time consumed : %5f" %(end-start))

num_of_alg = 1 #지금 example3까지 있긴한데, 제가 아직 example1의 Main.java만 손을 본 상태입니다
for i in range(1,num_of_alg+1):
    location = "/home/ihmhyunsir/pythonserver/example"+ str(i) + "/src/" #각 알고리즘은 example1 / example2 같이 example+숫자 폴더 안에 있는 걸로 통일
#compile

#각 알고리즘을 통해서 (Main.java) inputfile을 검사하고, output file(fixed_file)을 만듭니다
subprocess.run("javac Main.java", shell=True, cwd=location)
subprocess.run("java Main "+target_file_location+" "+fixed_file_location, shell=True, cwd=location)
print("Detection Done")

#fixed file 컴파일 하고 시간 측정
subprocess.run("javac Fixed.java", shell=True, cwd='/home/ihmhyunsir/pythonserver')
start = time.time()
subprocess.run("java Fixed", shell=True, cwd='/home/ihmhyunsir/pythonserver')
end = time.time()

print("Time consumed : %5f" %(end-start))
