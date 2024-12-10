import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {HealthCheckEntry} from '../../types';
import { Diagnosis } from '../../types';

interface Props {
    entrydata : HealthCheckEntry,
    diagnoses: Diagnosis[],
}

const HealtcheckEntry = ( {entrydata, diagnoses} : Props) => {
    
    const findDiagnose = (code: string) => {
        const diagnoseData = diagnoses.find(d => d.code === code);
        if (diagnoseData)
            return diagnoseData.name;
    };

    const getRating = (rating: number) =>{
        if (Number(rating) <1) 
            return <FavoriteIcon style={{ color: 'green' }}/>;
        else if (Number(rating) <2)
            return <FavoriteIcon style={{ color: 'yellow' }}/>;
        else 
            return <FavoriteIcon style={{ color: 'red' }}/>;
    };

    return (
        <div>
        <Divider orientation="horizontal" flexItem />
        <p>{entrydata.date} <MedicalServicesIcon/></p>
        <em>{entrydata.description}</em>
        <ul>
            {entrydata.diagnosisCodes?.map(code => 
                <li key={code}>
                    {`${code} ${findDiagnose(code)}`}
                </li>
            )}
        </ul>
        {getRating(entrydata.healthCheckRating)}
        <p>diagnose by {entrydata.specialist}</p>
        </div>
        );
};

export default HealtcheckEntry;