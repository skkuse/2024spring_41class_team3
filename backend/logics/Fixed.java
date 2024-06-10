import java.util.Random;

public class Fixed {

    public static void main(String[] args) {
        long startTime = System.nanoTime();

        
            Random r = new Random();
        for(int i=0; i<100000; i++) {
            int num = r.nextInt(10);

        }
            long endTime = System.nanoTime();
        long duration = (endTime - startTime);
        System.out.println();
        System.out.print(duration);
}
}
