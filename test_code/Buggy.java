import java.util.Random;

public class Buggy {
    public static void main(String[] args) {
        
        for(int i=0; i<100000; i++) {
            Random r = new Random();
            int num = r.nextInt(10);
        }
    }
}