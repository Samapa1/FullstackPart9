// import { useState, useEffect } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import Divider from '@mui/material/Divider';
import { OccupationalHealthcareEntry} from '../../types';
// import diagnosesService from "../../services/diagnoses";
import { Diagnosis } from '../../types';

interface Props {
    entrydata : OccupationalHealthcareEntry,
    diagnoses: Diagnosis[],
}

const OccupationalEntry = ( {entrydata, diagnoses} : Props) => {

    const findDiagnose = (code: string) => {
        const diagnoseData = diagnoses.find(d => d.code === code);
        if (diagnoseData)
            return diagnoseData.name;
    };

    return (
        <div>
        <Divider orientation="horizontal" flexItem />
        <p>{entrydata.date} <WorkIcon/> {` ${entrydata.employerName}`}</p>
        <p><em>{entrydata.description}</em></p>
        <ul>
            {entrydata.diagnosisCodes?.map(code => 
                <li key={code}>
                    {`${code} ${findDiagnose(code)}`}
                </li>
            )}
        </ul>
        <p>diagnose by {entrydata.specialist}</p>
        </div>
        );
};

export default OccupationalEntry;