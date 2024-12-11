import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients-full.ts';
import { Patient } from '../types';
import { NonSensitivePatientData } from '../types';
import { NewPatientEntry } from '../types';
import { Entry, EntryWithoutId } from '../types';


const getPatients = (): Patient[] => {
  return patientData;
};

const getPatientData = (id: string): Patient | undefined => {
    const onePatient = patientData.find(patient => patient.id === id);
    return onePatient;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patientData.map( ({id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}; 

const addPatient = ( patient: NewPatientEntry): Patient => {
    const id = uuid();
    const newPatient = {
        id: id,
        ...patient,
        entries: []
    };
    patientData.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
    const entryId = uuid();
    const patient = patientData.find(p => p.id === id);
    const newEntry = {
        id: entryId,
        ...entry
    };
    patient?.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatients,
    getNonSensitivePatientData,
    addPatient,
    getPatientData,
    addEntry
};