public class Buggy {
    public static void main(String[] args) {
        boolean cond1 = checkCond1();
        boolean cond2 = checkCond2();
        boolean cond3 = checkCond3();

        if(cond1) {
            if(cond2) {
                if(cond3) {
                    System.out.println("Hello");
                }
            }
        }
    }

    public static boolean checkCond1() {
        int sum = 0;
        for(int i=0; i<10000; i++) {
            sum += i;
        }
        return sum > 50000;
    }

    public static boolean checkCond2() {
        int sum = 0;
        for(int i=0; i<10000; i++) {
            sum *= i;
        }
        return sum > 50000;
    }

    public static boolean checkCond3() {
        int sum = 0;
        for(int i=0; i<10000; i++) {
            sum *= i;
        }
        return sum > 50000;
    }
}
