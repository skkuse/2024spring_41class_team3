import java.lang.reflect.Array;
import java.util.ArrayList;

public class Buggy_2 {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>();
        arr.add("a");
        arr.add("b");
        arr.add("c");
        arr.add("d");
        arr.add("e");
        arr.add("f");
        arr.add("g");
        int arr_size = arr.size();
        for(int i=0; i < arr_size; i++) {
            System.out.println("Hello");
        }
    }
}
