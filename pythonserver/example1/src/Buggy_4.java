import java.lang.reflect.Array;
import java.util.ArrayList;

public class Buggy_4 {
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
        int i = 0;
        while(i < arr_size)
            System.out.println("Hello");
            i++;
        }
    }

