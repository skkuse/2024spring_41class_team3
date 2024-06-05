import java.lang.reflect.Array;
import java.util.ArrayList;

public class Test_1 {
    public static void main(String[] args) {
     ArrayList<String> arr = new ArrayList<>(100000);
    String hell = ""; 
    for(int i = 0 ; i < 100000; i++){
        arr.add("Hello");
        hell += "hell"; 
    }
    for(int i=0; i<arr.size(); i++) {
            arr.get(i);
    }

}
}