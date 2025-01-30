import express, {Request, Response, NextFunction} from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { newPatientSchema, toNewEntry } from '../utils'; 
import { Patient, NewPatientEntry } from '../types';
import { Entry, EntryWithoutId } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (_req, res) => {
    const patient = patientService.getPatientData(_req.params.id);
    if (patient) {
      res.send(patient);
    }
    else {
      res.sendStatus(404);
    }
  });

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};


const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else if(error instanceof Error) {
    res.status(400).send({ error: error.message});
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);
});

router.post('/:id/entries', (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<Entry>) => {
  console.log(req.body);
  console.log(req.params.id);
  const entryData = toNewEntry(req.body);
  const newEntry = patientService.addEntry(req.params.id,  entryData);
  res.json(newEntry);
});


router.use(errorMiddleware);



export default router;