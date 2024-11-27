import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  // const newPatient = patientService.addPatient({
  //   name, 
  //   dateOfBirth,
  //   ssn,
  //   gender,
  //   occupation
  // });
  const newPatientEntry = toNewPatientEntry(req.body);
  const newPatient = patientService.addPatient(newPatientEntry)
  res.json(newPatient);
});

export default router;