import java.lang.reflect.Array;
import java.util.ArrayList;

public class Test_1 {
    public static void main(String[] args) {
    String hell = ""; 
    String cute = "i'm cute";
    for(int i = 0 ; i < 10000; i++){
        hell += cute ;
  }
  System.out.println(hell);
}
}