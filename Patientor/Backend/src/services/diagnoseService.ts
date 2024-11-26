import diagnoseData from '../../data/diagnoses.ts';
import { Diagnosis } from '../types';

// const diagnoses:  Diagnosis[] = diagnoseData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoseData;
};

// const addDiagnose = () => {
//   return null;
// };

export default {
    getDiagnoses,
//   addDiagnosis
};