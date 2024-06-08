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


                Pattern StringCreationPattern = Pattern.compile("(\\s*)String\\s+(\\w+)\\s*=\\s*\"\"\\s*;");
                Matcher objectMatcher = StringCreationPattern.matcher(line);
                if (objectMatcher.find()) {
                    StringCreationIndex = i;
                    isDetected = true;
                    variables.add(objectMatcher.group(2));
                    //System.out.println("String creation detected: " + line + " "+ objectMatcher.group(1));
                    codes[i] = String.format("%sStringBuilder %s = new StringBuilder();", objectMatcher.group(1),objectMatcher.group(2));
                }
            }
            
            
            for(int i=0; i<lineSize; i++) {
                String line = codes[i];

                Pattern Pattern_1 = Pattern.compile("(\\s*)(\\w+)\\s*\\+=\\s*(\"[^\"]*\")\\s*\\+\\s*(\\w+)\\s*;");
                Pattern Pattern_2 = Pattern.compile("(\\s*)(\\w+)\\s*\\+=\\s*(\"[^\"]*\")\\s*;");
                Pattern Pattern_3 = Pattern.compile("(\\s*)(\\w+)\\s*\\+=\\s*(\\w+)\\s*;");
                Pattern Pattern_4 = Pattern.compile("(\\s*)System\\.out\\.println\\s*\\(\\s*([a-zA-Z_$][a-zA-Z\\d_$]*)\\s*\\);");
                Matcher Matcher_1 = Pattern_1.matcher(line);
                Matcher Matcher_2 = Pattern_2.matcher(line);
                Matcher Matcher_3 = Pattern_3.matcher(line);
                Matcher Matcher_4 = Pattern_4.matcher(line);
                if (Matcher_1.find()) {
                    //System.out.println("1 detected: "+ Matcher_1.group(2));
                    int idx = variables.indexOf(Matcher_1.group(2));
                    if( idx !=  -1){
                        codes[i] = String.format("%s%s.append(%s).append(%s.toString());", Matcher_1.group(1),Matcher_1.group(2),Matcher_1.group(3),Matcher_1.group(4));
                    }
                }
                else if (Matcher_2.find()) {
                    //System.out.println("2 detected" + line);
                    int idx = variables.indexOf(Matcher_2.group(2));
                    if( idx !=  -1){
                        codes[i] = String.format("%s%s.append(%s);", Matcher_2.group(1),Matcher_2.group(2),Matcher_2.group(3));
                    }
                }
                else if (Matcher_3.find()) {
                    //System.out.println("3 detected " + line);
                    int idx = variables.indexOf(Matcher_3.group(2));
                    if( idx !=  -1){
                        codes[i] = String.format("%s%s.append(%s.toString());", Matcher_3.group(1),Matcher_3.group(2),Matcher_3.group(3));
                    }
                }
                else if (Matcher_4.find()){
                    int idx = variables.indexOf(Matcher_4.group(2));
                    if( idx !=  -1){
                        codes[i] = String.format("%sSystem.out.println(%s.toString());",Matcher_4.group(1), Matcher_4.group(2));
                    }
                }
            }
            
            if(isDetected) {
                System.out.println("Algorithm 4 found Line "+ StringCreationIndex);
                reader.close();

                FileWriter fw = new FileWriter(fixedFilePath);
                BufferedWriter writer = new BufferedWriter(fw);
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
