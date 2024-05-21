import java.lang.reflect.Array;
import java.util.ArrayList;

public class Buggy_3 {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>();
        arr.add("a");
        arr.add("b");
        arr.add("c");
        arr.add("d");
        arr.add("e");
        arr.add("f");
        arr.add("g");
        int i = 0;
        while(i<arr.size()) {
            System.out.println("Hello");
            i++;
        }
    }
}
