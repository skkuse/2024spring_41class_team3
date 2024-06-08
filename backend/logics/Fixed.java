import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class Fixed {
    public static void main(String[] args) throws IOException {
        long startTime = System.currentTimeMillis();

        String filePath = "nonBufferedOutput.txt";

        BufferedWriter writer = new BufferedWriter(new FileWriter(filePath));
        ArrayList<String> arr = new ArrayList<>();

        for(int i = 0; i < 1000; i++){
            arr.add("Line"+i+"\n");
        }
        int arrSize = arr.size();
        for (int i = 0; i < arrSize; i++) {
            writer.write(arr.get(i));
        }
            

        BufferedReader reader = new BufferedReader(new FileReader(filePath));
            int ch;
            while ((ch = reader.read()) != -1) {
                System.out.print((char) ch);
            }
            long endTime = System.currentTimeMillis();
        long duration = (endTime - startTime);
        System.out.println();
        System.out.print(duration);
}
}
