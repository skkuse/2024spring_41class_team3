import java.util.Random;

public class Fixed {

    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();

        StringBuilder hello = new StringBuilder();
        String haha = "haha";
            Random r = new Random();
        for(int i=0; i<100000; i++) {
            int num = r.nextInt(10);
            hello.append(haha.toString());
            System.out.println(num);
        }
            long endTime = System.currentTimeMillis();
        long duration = (endTime - startTime);
        System.out.println();
        System.out.print(duration);
}
}
