import { z } from 'zod';
import { Gender } from './types';
import { Discharge, SickLeave } from './types';
import { EntryWithoutId } from './types';
import { Diagnosis } from './types';
import {HealthCheckRating} from './types';

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

const parseDischarge = (object: unknown): Discharge => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing discharge field');
      }

    if ('date' in object && 'criteria' in object) {
        const discharge = {
            date: z.string().parse(object.date),
            criteria: z.string().parse(object.criteria),
        };
        return discharge;
    }
    throw new Error('Incorrect discharge field');
};

const parseSickLeave = (object: unknown): SickLeave => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect sickleave field');
      }

    if ('startDate' in object && 'endDate' in object) {
        const sickLeave = {
            startDate: z.string().parse(object.startDate),
            endDate: z.string().parse(object.endDate),
        };
        return sickLeave;
    }
    throw new Error('Incorrect sickleave field');
};

const isSsn = (ssn: string): boolean => {
    if (ssn.includes('-') || ssn.includes('A') ) {
        const splitter = ssn.includes('-') ? '-' : 'A';
        const parts = ssn.split(splitter);
        console.log(parts);
        if (isNaN(Number(parts[0])) || parts[0].length !== 6 || parts[1].length > 4 || parts[1].length < 3 ) 
            return false;
        return true;
    }
    return false;
};

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().refine(isSsn, {
        message: "Incorrect or missing ssn",
    }),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
 
    if ('date' in object && 'specialist' in object && 'type' in object && 'description' in object)  {
        
        const newBaseEntry = {
            date: z.string().date().parse(object.date),
            specialist: z.string().min(1).parse(object.specialist),
            description: z.string().min(1).parse(object.description),
            diagnosisCodes: parseDiagnosisCodes(object),
        };

        switch(object.type) {
            case "HealthCheck":
                { 
                    if ("healthCheckRating" in object) {
                        const newEntry: EntryWithoutId = {
                            type: "HealthCheck",
                            healthCheckRating: z.nativeEnum(HealthCheckRating).parse(object.healthCheckRating),
                            ...newBaseEntry
                        };
                        return newEntry;
                    }
                break;
                }
            case "Hospital": 
                {
                    if ("discharge" in object ) {
                        const newEntry: EntryWithoutId = {
                            type: "Hospital",
                            discharge: parseDischarge(object.discharge),
                            ...newBaseEntry
                        };
                        return newEntry;
                    }
                    break;
                }
            case "OccupationalHealthcare":
                { 
                    if ("employerName" in object && "sickLeave" in object) {
                        const newEntry: EntryWithoutId = {
                            type: "OccupationalHealthcare",
                            employerName: z.string().parse(object.employerName),
                            sickLeave: parseSickLeave(object.sickLeave),
                            ...newBaseEntry
                        };
                        return newEntry; 
                    }

                    if ("employerName" in object) {
                        const newEntry: EntryWithoutId = {
                            type: "OccupationalHealthcare",
                            employerName: z.string().parse(object.employerName),
                            ...newBaseEntry
                        };
                        return newEntry; 
                    }
                    break;
                  
                }
                default:
                    break;
      }
    
    };
    throw new Error('Incorrect data: some fields are incorrect or missing');
};
    




