import { isNotNumber } from "./utils";
import { isEmpty } from "./utils";

interface exerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (a: number[], b: number): exerciseValues => {

    let trainingdays = 0;
    a.forEach(day => {if (day > 0) 
    {trainingdays ++}
    })

    let traininghours = 0;
    a.forEach(day => traininghours += day )

    const average = traininghours / a.length;
    const isSuccess = average >= b;

    const checkRating = (target: number, average: number) => {
        if (average >= target) {
            return 3;
        }
        else if (average >= target*0.6)
            return 2;
        else 
            return 1;
    } 

    const ratingNumber = checkRating(b, average);

    const getDescription = (ratingNumber: number) => {
        if (ratingNumber === 3) {
            return 'very well done';
        }
        else if (ratingNumber === 2) {
            return 'ok result';
        }
        else 
        return 'there is room for improvement';
    }


    return {
        periodLength: a.length,
        trainingDays: trainingdays,
        success: isSuccess,
        rating: ratingNumber,
        ratingDescription: getDescription(ratingNumber),
        target: b,
        average: average
    }
}

try {
    const numberArray = []
    if (isEmpty()) {
        throw new Error('there must be at least 2 input values (target and daily training hours)');
    }
    let i = process.argv.length -1;
    while  (i >2) {
        if (isNotNumber(process.argv[i])) {
            throw new Error('input must be numbers');
        } 
        numberArray.push(Number(process.argv[i]))
        i --
    }
    console.log(calculateExercises(numberArray,Number(process.argv[2])));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }

// exercise 9.2
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));


