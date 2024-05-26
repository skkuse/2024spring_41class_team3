import java.lang.reflect.Array;
import java.util.ArrayList;

public class Fixed {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>(100000000);
        for(int i = 0 ; i < 100000000; i++)
            arr.add("Hello");
        int arrSize = arr.size();

        for(int i=0; i<arrSize; i++) {
            arr.get(i);
        }
    }
}
