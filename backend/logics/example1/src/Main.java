import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
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

        try {
            FileReader reader = new FileReader(buggyFilePath);

            int ch;
            StringBuilder content = new StringBuilder();
            while ((ch = reader.read()) != -1) {
                content.append((char) ch);

            }

            String[] codes = content.toString().split("\n");
            ArrayList<String> lines = new ArrayList<>(Arrays.asList(codes));

            int buggyLine = -1;
            String arrayListVariableName = "";
            int lineSize = lines.size();

            for(int i=0; i<lineSize; i++) {
                String line = codes[i];
                if(line.contains("public class")) {      
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
                            buggyLine = j;
                            isDetected = true;
                            break;
                        }
                    }
                }
            }

            if(isDetected) {
                String bug_line = lines.get(buggyLine);
                if( !bug_line.contains("for") && !bug_line.contains("while")){
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
                    writer.write("\n"); 
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