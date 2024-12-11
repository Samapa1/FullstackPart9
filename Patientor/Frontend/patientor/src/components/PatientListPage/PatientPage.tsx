import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import patientService from "../../services/patients";
import { Patient } from '../../types';
import EntryDetails from '../Entries/EntryDetails';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from '../../types';

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const id = useParams().id;
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    useEffect(() => {
        const getPatient = async (id: string | undefined ) => {
            if (id) {
            const patientData = await patientService.getOne(id);
            setPatient(patientData);
            }
        };
        getPatient(id);
    }, [id]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
        if (patient) {
            const entry = await patientService.addEntry(values, patient.id);
            const patientData = await patientService.getOne(patient.id);
            setPatient(patientData);
            console.log(entry);
    }
    console.log(values);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

    if (patient) {
        return (
            <div>
                <h2>{patient.name}</h2>{patient.gender === "female" ? <FemaleIcon/> : <MaleIcon/>}
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button variant="contained" onClick={() => openModal()}>
                    Add a new entry
                </Button>
                <h3>entries</h3>
                {patient.entries.map(entry => <div key={entry.id}><EntryDetails entrydata= {entry}/> </div>)}
            </div>
        );

}
    
};

export default PatientPage;