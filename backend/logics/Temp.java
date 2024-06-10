import java.util.Random;

public class Temp {
    public static void main(String[] args) {
        long startTime = System.nanoTime();

        
        for(int i=0; i<100000; i++) {
            Random r = new Random();
            int num = r.nextInt(10);

        }
            long endTime = System.nanoTime();
        long duration = (endTime - startTime);
        System.out.println();
        System.out.print(duration);
}
}