import { isNotNumber } from "./utils";

export const calculateBmi = (a: number, b: number): string => {
    if (isNotNumber(a) || isNotNumber(b)) {
        throw new Error('input must be numbers');
    } 

    const BMI = b/((a/100) ** 2);
    
    if (BMI < 18.4) {
        return 'Underweight';
    } 
    else if (BMI >= 18.5 && BMI <= 24.9) {
        return 'Normal range';
    } 
    else if (BMI >= 25.0 && BMI <= 29.9) {
        return 'Overweight';
    } 
    else 
        return 'Obese';
}

try {
    if (require.main === module) {
        console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }

// exercise 9.1
// console.log(calculateBmi(180, 74));