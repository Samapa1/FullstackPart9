import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import { useState, useEffect } from 'react';
import { Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const id = useParams().id;

    useEffect(() => {
        const getPatient = async (id: string | undefined ) => {
            if (id) {
            const patientData = await patientService.getOne(id);
            setPatient(patientData);
            }
        };
        void getPatient(id);
    }, [id]);

    if (patient) {
        return (
            <div>
            <h2>{patient.name}</h2>{patient.gender === "female" ? <FemaleIcon/> : <MaleIcon/>}
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            </div>
        );

}
    
};

export default PatientPage;