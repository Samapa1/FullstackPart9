import express = require('express');
const app = express();
import { calculateBmi } from './bmiCalculator';

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
      })
    } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({
            error: "malformatted parameters"
          })
        }
      }
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});