import java.io.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

// 반복문 내에서 불필요하게 중복적으로 객체선언하는 에너지낭비패턴
public class Main {
    public static void main(String[] args) {
        boolean isDetected = false;
        String buggyFilePath = "Buggy.java";
        String fixedFilePath = "Fixed.java";
        int classStartIndex = 0;

        int objectCreationIndex = 0;
        int loopCreationIndex = 0;

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
            int lineSize = lines.size();

            // find object creation
            for(int i=0; i<lineSize; i++) {
                String line = codes[i];
                if (line.contains("public class Buggy")) {
                    classStartIndex = i;
                    continue;
                }

                Pattern objectPattern = Pattern.compile("\\b[A-Z]\\w*\\s+[a-z]\\w*\\s*=\\s*new\\s+[A-Z]\\w*\\s*\\(\\s*\\)\\s*;");

                Matcher objectMatcher = objectPattern.matcher(line);
                if (objectMatcher.find()) {
                    System.out.println("Object creation detected: " + line);
                    objectCreationIndex = i;
                    break;
                }
            }

            // find for or while
            for(int i=0; i<lineSize; i++) {
                String line = codes[i];

                Pattern forPattern = Pattern.compile("\\b(?:for|while)\\s*\\(.*?\\)\\s*\\{");
                Matcher forMatcher = forPattern.matcher(line);
                if (forMatcher.find()) {
                    System.out.println("loop detected: " + line);
                    loopCreationIndex = i;
                    break;
                }
            }

//            System.out.println(lines.get(objectCreationIndex));
//            System.out.println(lines.get(loopCreationIndex));


            // 수정
            if(objectCreationIndex != 0) {
                lines.set(classStartIndex, "public class Fixed {\n");
                String fixedContent = lines.get(objectCreationIndex);

                lines.set(objectCreationIndex, "##MUSTDELETE##");
                lines.add(loopCreationIndex, fixedContent);

                lines.removeIf(item -> item.equals("##MUSTDELETE##"));

                for(int i=0; i<lines.size(); i++) {
                    System.out.println(i + " : " + lines.get(i));
                }

                reader.close();
//
                FileWriter fw = new FileWriter(fixedFilePath);
                BufferedWriter writer = new BufferedWriter(fw);
                lines.forEach(item -> {
                    try {
                        writer.write(item);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
                writer.close();
            }


        } catch(Exception e) {
            System.out.println(e);
        }
    }

}
