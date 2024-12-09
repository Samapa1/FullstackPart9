import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Patient } from '../../types';
import { Diagnosis } from '../../types';

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const id = useParams().id;

    useEffect(() => {
        const getPatient = async (id: string | undefined ) => {
            if (id) {
            const patientData = await patientService.getOne(id);
            setPatient(patientData);
            }
        };
        getPatient(id);
    }, [id]);

    useEffect(() => {
        const getDiagnoses = async () => {
            const diagnosesData = await diagnosesService.getAll();
            setDiagnoses(diagnosesData);
        };
        getDiagnoses();
    }, []);

    const findDiagnose = (code: string) => {
        const diagnoseData = diagnoses.find(d => d.code === code);
        if (diagnoseData)
            return diagnoseData.name;
    };


    if (patient) {
        return (
            <div>
                <h2>{patient.name}</h2>{patient.gender === "female" ? <FemaleIcon/> : <MaleIcon/>}
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h3>entries</h3>
                {patient.entries.map(entry => {
                    return (
                        <div key= {entry.id}>
                        <p>{entry.date} <em>{entry.description}</em></p>
                        <ul>
                            {entry.diagnosisCodes?.map(code => 
                                <li key={code}>
                                    {`${code} ${findDiagnose(code)}`}
                                </li>
                            )}
                        </ul>
                        </div>
                    );
                })}
            </div>
        );

}
    
};

export default PatientPage;