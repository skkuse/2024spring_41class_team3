import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

// arraylist객체의 사이즈를 반복문의 조건에서 불필요하게 계속 구하는 에너지낭비로직
public class Main {
    public static void main(String[] args) {
        String target_file = args[0];                    //알고리즘으로 탐지할 targetfile의 위치
        String fixed_file = args[1];                    // 탐지 후 output할 file의 위치
        boolean isDetected = false;
        String buggyFilePath = target_file;
        String fixedFilePath = fixed_file;
        int classStartIndex = 0;

        try {
            FileReader reader = new FileReader(buggyFilePath);

            int ch;
            StringBuilder content = new StringBuilder();
            while ((ch = reader.read()) != -1) {
                content.append((char) ch);

            }

            // 코드 분할
            String[] codes = content.toString().split("\n");
            ArrayList<String> lines = new ArrayList<>(Arrays.asList(codes));

            // 검출
            int buggyLine = -1;
            String arrayListVariableName = "";
            int lineSize = lines.size();

            for(int i=0; i<lineSize; i++) {
                String line = codes[i];
                if(line.contains("public class")) {       //변경점 public class Buggy -> public class
                    classStartIndex = i;
                    continue;
                }

                Pattern pattern = Pattern.compile("\\bArrayList\\s*<[^>]*>\\s+([a-zA-Z0-9_]+)\\s*=");

                Matcher matcher = pattern.matcher(line);
                if (matcher.find()) {
                    arrayListVariableName = matcher.group(1);

                    for(int j=i; j<codes.length; j++) {
                        String line2 = codes[j];
                        Pattern sizeMethodPattern = Pattern.compile("\\b" + arrayListVariableName + "\\.size\\(\\)");

                        Matcher sizeMethodMatcher = sizeMethodPattern.matcher(line2);
                        if (sizeMethodMatcher.find()) {
//                            System.out.println("ArrayList 객체 변수명: " + arrayListVariableName);
//                            System.out.println("해당 변수를 사용하여 size() 메서드를 호출함");
                            buggyLine = j;
                            isDetected = true;
                            break;
                        }
                    }
                }
            }

            // 수정
            if(isDetected) {
                String bug_line = lines.get(buggyLine);
                if( !bug_line.contains("for") && !bug_line.contains("while")){ // 변경점 .size()함수를 찾으면 무조건 변수화 하는것이 아니라, 반복문 내에서 호출될때 변경
                    System.out.println("Not found");
                }
                else{
                    System.out.println("Found");
                    int count = countLeadingSpaces(lines.get(buggyLine));
                    lines.set(classStartIndex, "public class Fixed {");
                    lines.set(buggyLine, lines.get(buggyLine).replace(arrayListVariableName + ".size()", arrayListVariableName + "Size"));

                    StringBuilder builder = new StringBuilder();
                    for(int i=0; i<count; i++) {
                        builder.append(' ');
                    }
                    builder.append("int " + arrayListVariableName + "Size = " + arrayListVariableName + ".size();\n");
                    lines.add(buggyLine, builder.toString());
                }
            }
            else{
                System.out.println("Not found");
            }

            reader.close();

            FileWriter fw = new FileWriter(fixedFilePath);
            BufferedWriter writer = new BufferedWriter(fw);
            lines.forEach(item -> {
                try {
                    writer.write(item);
                    writer.write("\n");             //변경점 이거 없으면 다 붙어서 나옴(Ubuntu 22.04 기준). 다만 os별로 확인 요망(윈도우에서는 잘 나옴)
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
            writer.close();

        } catch(Exception e) {
            System.out.println(e);
        }
    }

    public static int countLeadingSpaces(String text) {
        int count = 0;
        for (int i = 0; i < text.length(); i++) {
            if (text.charAt(i) == ' ') {
                count++;
            } else {
                break;
            }
        }
        return count;
    }
}