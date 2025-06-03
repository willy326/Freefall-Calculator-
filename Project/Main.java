
//William's Code
import java.util.Scanner;
public class Main {
    public static void main(String[] args){
        
        Scanner input = new Scanner(System.in);

        System.out.println();
        System.out.println("----------------------------------------------------------");
        System.out.println("What height, in meters, are you dropping the ball from?");
        double height = input.nextDouble();
        input.nextLine();

        System.out.println("Which planet do you want to drop the ball from? \n Choose from: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune");
        String planet = input.nextLine();

        System.out.println("What is the mass of the object in kg?");
        double mass = input.nextDouble();

        Calculations physics = new Calculations();
        double acceleration = physics.Gravity(planet);
        
        System.out.println("----------------------------------------------------------");
        System.out.println("gravitational acceleration: " + acceleration);
        
        double time = physics.fallTime(height,acceleration);
        System.out.println("Fall time without air resistance: " + time);

        double k = 0.5;   
        double timeAir = physics.fallTimeWithAirResistance(height, mass, k, acceleration);
        System.out.println("Fall time with air resistance: " + timeAir);
        System.out.println("----------------------------------------------------------");
        System.out.println();

        //This part is written by Sewon
        double impulse = physics.computeImpulse(mass, acceleration, height);
        System.out.println("Impulse upon impact (no air resistance): " + impulse + " N·s");

        System.out.println("----------------------------------------------------------");
        System.out.println();
    }
}
