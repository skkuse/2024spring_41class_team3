import java.lang.reflect.Array;
import java.util.ArrayList;

public class Fixed {
    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();

        ArrayList<String> arr = new ArrayList<>();
        for(int i = 0 ; i < 100000; i++)
            arr.add("Hello");
        int arrSize = arr.size();
        for(int i=0; i<arrSize; i++) {
            arr.get(i);
        }
            long endTime = System.currentTimeMillis();
        long duration = (endTime - startTime);
        System.out.println();
        System.out.print(duration);
}
}
