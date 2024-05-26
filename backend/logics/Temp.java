import java.lang.reflect.Array;
import java.util.ArrayList;

public class Temp {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>(100000000);
        for(int i = 0 ; i < 100000000; i++)
            arr.add("Hello");
        for(int i=0; i<arr.size(); i++) {
            arr.get(i);
        }
    }
}