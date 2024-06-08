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

        int StringCreationIndex = 0;
        int loopCreationIndex = 0;
        List<String> variables = new ArrayList<>();
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
                if (line.contains("public class Temp")) {
                    codes[i] = "public class Fixed {";
                    continue;
                }


                Pattern FileReaderCreationPattern = Pattern.compile("([\\s]*)FileReader\\s+(\\w+)\\s*=\\s*new\\s+FileReader\\s*\\((\\w+|\"[^\"]*\")\\);"                );
                Pattern FileWriterCreationPattern = Pattern.compile("([\\s]*)FileWriter\\s+(\\w+)\\s*=\\s*new\\s+FileWriter\\s*\\((\\w+|\"[^\"]*\")\\);"                );
                Matcher FileReaderMatcher = FileReaderCreationPattern.matcher(line);
                Matcher FileWriterMatcher = FileWriterCreationPattern.matcher(line);
                if (FileReaderMatcher.find()) {
                    isDetected = true;
                    String blank = FileReaderMatcher.group(1);
                    String var = FileReaderMatcher.group(2);
                    String path = FileReaderMatcher.group(3);
                    //System.out.println("String creation detected: " + line + " "+ objectMatcher.group(1));w
                    codes[i] = String.format("%sBufferedReader %s = new BufferedReader(new FileReader(%s));", blank, var, path);
                }
                if (FileWriterMatcher.find()) {
                    isDetected = true;
                    String blank = FileWriterMatcher.group(1);
                    String var = FileWriterMatcher.group(2);
                    String path = FileWriterMatcher.group(3);
                    //System.out.println("String creation detected: " + line + " "+ objectMatcher.group(1));
                    codes[i] = String.format("%sBufferedWriter %s = new BufferedWriter(new FileWriter(%s));", blank, var, path);
                }
            }
            
            
            if(isDetected) {
                
                System.out.println("Algorithm 5 found");
                reader.close();

                FileWriter fw = new FileWriter(fixedFilePath);
                BufferedWriter writer = new BufferedWriter(fw); 
                writer.write("import java.io.BufferedReader;\n");
                writer.write("import java.io.BufferedWriter;\n");
                for( int i = 0 ; i < codes.length; i++)
                {
                    writer.write(codes[i]);
                    writer.write("\n");
                }
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
