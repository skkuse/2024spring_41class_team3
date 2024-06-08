import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class Temp {
    public static void main(String[] args) throws IOException {
        String filePath = "nonBufferedOutput.txt";

        FileWriter writer = new FileWriter(filePath);
        ArrayList<String> arr = new ArrayList<>();

        for(int i = 0; i < 1000; i++){
            arr.add("Line"+i+"\n");
        }
        for (int i = 0; i < arr.size(); i++) {
            writer.write(arr.get(i));
        }
            

        FileReader reader = new FileReader(filePath);
            int ch;
            while ((ch = reader.read()) != -1) {
                System.out.print((char) ch);
            }
    }
}