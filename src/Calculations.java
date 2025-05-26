import java.util.Scanner;

public class Calculations{

    public double Gravity(String planet){
        
        if(planet.equalsIgnoreCase("mercury")){
            return 3.7;
        }
        if(planet.equalsIgnoreCase("venus")){
            return 8.87;
        }
        if(planet.equalsIgnoreCase("earth")){
            return 9.807;
        }
        if(planet.equalsIgnoreCase("mars")){
            return 3.73;
        }
        if(planet.equalsIgnoreCase("Jupiter")){
            return 24.79;
        }
        if(planet.equalsIgnoreCase("Saturn")){
            return 10.44;
        }
        if(planet.equalsIgnoreCase("Uranus")){
            return 8.69;
        }
        if(planet.equalsIgnoreCase("Neptune")){
            return 11.15;
        }

        System.out.println("invalid planet name");
        return 0;
        
    }

    public double fallTime(double h, double g){

        return Math.sqrt((2*h)/g);

    }

    public double fallEquation(double t, double h, double m, double k, double g) {
        return (m * g / k) * (t - (m / k) * (1 - Math.exp(-k * t / m))) - h;
    }

    public double fallTimeWithAirResistance(double h, double m, double k, double g) {
        double a = 0;
        double b = 10; // increase b to ensure root is bracketed
        double tol = 1e-10;
        double mid = 0;

        double fA = fallEquation(a, h, m, k, g);
        double fB = fallEquation(b, h, m, k, g);

        // Important check!
        if (fA * fB > 0) {
            System.out.println("Bisection failed: f(a) and f(b) have the same sign.");
            return -1;
        }

        while ((b - a) / 2.0 > tol) {
            mid = (a + b) / 2.0;
            double fMid = fallEquation(mid, h, m, k, g);

            if (fMid == 0.0) return mid;
            else if (fMid * fA < 0) {
                b = mid;
                fB = fMid;
            } else {
                a = mid;
                fA = fMid;
            }
        }

        return (a + b) / 2.0;
    }
    //This code was written by chatGPT. This code uses bisection method to find close apprximiation for time


}