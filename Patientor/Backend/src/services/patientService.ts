import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients.ts';
import { Patient } from '../types';
import { NonSensitivePatientData } from '../types';
import { NewPatientEntry } from '../types';


const getPatients = (): Patient[] => {
  return patientData;
};

// const getPatientData = (id: string): Patient => {
//     const onePatient = patientData.find(patient => patient.id === id);
//     if (!onePatient)
//         throw new Error('The patient was not found!');

//     return onePatient;
// };

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

export default {
    getPatients,
    getNonSensitivePatientData,
    addPatient,
    getPatientData
};