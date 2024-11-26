import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients.ts';
import { Patient } from '../types';
import { NonSensitivePatientData } from '../types';
import { NewPatientEntry } from '../types';


const getPatients = (): Patient[] => {
  return patientData;
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
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatientData,
    addPatient
};