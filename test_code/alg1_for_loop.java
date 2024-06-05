import java.lang.reflect.Array;
import java.util.ArrayList;

public class Buggy_1 {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>();
        for(int i = 0; i < 1000000; i++){
            arr.add("a");
        }
        for(int i=0; i<arr.size(); i++) {
            System.out.println("Hello");
        }
    }
}
