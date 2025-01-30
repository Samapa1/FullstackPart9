import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height); 
    const weight = Number(req.query.weight); 
    const bmi = calculateBmi(height, weight);
    res.send({
        weight: weight,
        height: height,
        bmi: bmi
      });
  } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({
          error: "malformatted parameters"
        });
      }
    }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if (!daily_exercises || !target)
      throw new Error(('parameters missing'));

    if (isNotNumber(target)) {
      throw new Error('malformatted parameters');
    } 

    if (!Array.isArray(daily_exercises)) {
      throw new Error('malformatted parameters');
    }

    const res1 = daily_exercises.map(a => {
      if (isNotNumber(a)) {
        throw new Error('malformatted parameters');
      } else {
        return Number(a);
      }
    } );

    const exerciseResults = calculateExercises(res1, Number(target));

    res.send(exerciseResults);

  } catch (error: unknown) {
      let errorMessage = 'Something went wrong';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(400).json({errorMessage});
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});