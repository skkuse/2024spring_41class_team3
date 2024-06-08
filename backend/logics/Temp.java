import java.lang.reflect.Array;
import java.util.ArrayList;

public class Temp {
    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();

        ArrayList<String> arr = new ArrayList<>();
        for(int i = 0 ; i < 100000; i++)
            arr.add("Hello");
        for(int i=0; i<arr.size(); i++) {
            arr.get(i);
        }
            long endTime = System.currentTimeMillis();
        long duration = (endTime - startTime);
        System.out.println();
        System.out.print(duration);
}
}