import { HospitalEntryType } from '../../types';
import { Diagnosis } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Divider from '@mui/material/Divider';

interface Props {
    entrydata : HospitalEntryType,
    diagnoses: Diagnosis[],
}

const HospitalEntry = ( {entrydata, diagnoses} : Props) => {

    const findDiagnose = (code: string) => {
        const diagnoseData = diagnoses.find(d => d.code === code);
        if (diagnoseData)
            return diagnoseData.name;
    };

    return (
        <div>
        <Divider orientation="horizontal" flexItem />
        <p>{entrydata.date} <LocalHospitalIcon/></p>
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

export default HospitalEntry;