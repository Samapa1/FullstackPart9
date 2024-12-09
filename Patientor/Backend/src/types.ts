import { z } from 'zod';
import { newEntrySchema } from './utils'; 

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}



export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

// export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewPatientEntry = z.infer<typeof newEntrySchema>; 

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}