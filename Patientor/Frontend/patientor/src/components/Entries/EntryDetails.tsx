import { useState, useEffect } from 'react';

import { Entry } from '../../types';
import diagnosesService from "../../services/diagnoses";
import { Diagnosis } from '../../types';
import HospitalEntry from './HospitalEntry';
import HealtcheckEntry from './HealtcheckEntry';
import OccupationalEntry from './OccupationalEntry';

interface Props {
    entrydata : Entry
}

const EntryDetails = ( {entrydata} : Props) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const getDiagnoses = async () => {
            const diagnosesData = await diagnosesService.getAll();
            setDiagnoses(diagnosesData);
        };
        getDiagnoses();
    }, []);

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

        switch(entrydata.type) {
            case "HealthCheck":
                return <HealtcheckEntry entrydata={entrydata} diagnoses={diagnoses}/>;
            case "Hospital":
                return <HospitalEntry entrydata={entrydata} diagnoses={diagnoses}/>;
            case "OccupationalHealthcare":
                return <OccupationalEntry entrydata={entrydata} diagnoses={diagnoses}/>;
            default:
                return assertNever(entrydata);
        }      
};

export default EntryDetails;

