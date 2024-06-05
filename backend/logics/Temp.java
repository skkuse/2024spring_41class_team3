import java.util.Random;

public class Temp {
    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();

        String hello = "";
        String haha = "haha";
        for(int i=0; i<100000; i++) {
            Random r = new Random();
            int num = r.nextInt(10);
            hello += haha;
            System.out.println(num);
        }
            long endTime = System.currentTimeMillis();
        long duration = (endTime - startTime);
        System.out.println();
        System.out.print(duration);
}
}