import java.util.Random;

public class Buggy {
    public static void main(String[] args) {
        String hello = "";
        String haha = "haha";
        for(int i=0; i<100000; i++) {
            Random r = new Random();
            int num = r.nextInt(10);
            hello += haha;
            System.out.println(num);
        }
    }
}