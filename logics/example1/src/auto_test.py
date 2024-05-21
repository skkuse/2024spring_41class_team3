import subprocess
import time
import pandas as pd

java_file = "Main.java"

compile_command = f"javac {java_file}"
run_command = f"java {java_file[:-5]}"

csv = pd.read_csv("TestCase.csv")
Test_cases = csv[:]["Test_Case"]
Output = csv[:]["Output"]

num_of_test_case = len(Test_cases)
error = 0

#compile detector(Main.java)
subprocess.run(compile_command, shell=True, cwd='./')
# Run test
for i in range(0,num_of_test_case):
    subprocess.run(run_command + " " + Test_cases[i] + ".java" + ">> test_result.txt", shell=True, cwd='./')

# Open test result txt
f = open("test_result.txt","r")
answers = []
for i in range(0,num_of_test_case):
    line = f.readline()
    answers.append(line[:-1])

# Compare outputs with answers
for i in range(0,num_of_test_case):
    if Output[i] != answers[i] : 
        error += 1
        print("Test_case %d error!" %(i+1))

print("Test acc : %.2f" %(100 * (num_of_test_case-error) / num_of_test_case))

f.close()

subprocess.run("rm test_result.txt", shell=True, cwd='./')

print("Detect 1 Finish")



