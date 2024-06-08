import java.io.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        String target_file = args[0];                  
        String fixed_file = args[1];
        boolean isDetected = false;
        String buggyFilePath = target_file;
        String fixedFilePath = fixed_file;
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

            String[] codes = content.toString().split("\n");
            ArrayList<String> lines = new ArrayList<>(Arrays.asList(codes));

            int lineSize = lines.size();

            for(int i=0; i<lineSize; i++) {
                String line = codes[i];
                if (line.contains("public class")) {
                    classStartIndex = i;
                    continue;
                }

                Pattern objectPattern = Pattern.compile("\\b[A-Z]\\w*\\s+[a-z]\\w*\\s*=\\s*new\\s+[A-Z]\\w*\\s*\\(\\s*\\)\\s*;");

                Matcher objectMatcher = objectPattern.matcher(line);
                if (objectMatcher.find()) {
                    // System.out.println("Object creation detected: " + line);
                    objectCreationIndex = i;
                    break;
                }
            }

            for(int i=0; i<lineSize; i++) {
                String line = codes[i];

                Pattern forPattern = Pattern.compile("\\b(?:for|while)\\s*\\(.*?\\)\\s*\\{");
                Matcher forMatcher = forPattern.matcher(line);
                if (forMatcher.find()) {
                    // System.out.println("loop detected: " + line);
                    loopCreationIndex = i;
                    break;
                }
            }

            if(objectCreationIndex != 0 && loopCreationIndex != 0) {
                System.out.println("Algorithm 3 found Line "+ objectCreationIndex);
                lines.set(classStartIndex, "public class Fixed {\n");
                String fixedContent = lines.get(objectCreationIndex);

                lines.set(objectCreationIndex, "##MUSTDELETE##");
                lines.add(loopCreationIndex, fixedContent);

                lines.removeIf(item -> item.equals("##MUSTDELETE##"));

                for(int i=0; i<lines.size(); i++) {
                    // System.out.println(i + " : " + lines.get(i));
                }

                reader.close();
                FileWriter fw = new FileWriter(fixedFilePath);
                BufferedWriter writer = new BufferedWriter(fw);
                lines.forEach(item -> {
                    try {
                        writer.write(item);
                        writer.write("\n");
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
                writer.close();
            }
            else{
                System.out.println("Not Found");
            }

        } catch(Exception e) {
            System.out.println(e);
        }
    }

}
