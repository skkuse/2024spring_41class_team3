import java.lang.reflect.Array;
import java.util.ArrayList;

public class Temp {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>(10);
        for(int i = 0 ; i < 10; i++)
            arr.add("Hello");
        for(int i=0; i<arr.size(); i++) {
            arr.get(i);
        }
    }
}