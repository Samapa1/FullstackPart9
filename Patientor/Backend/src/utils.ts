import { z } from 'zod';
import { Gender } from './types';
// import { NewPatientEntry } from './types';


const isSsn = (ssn: string): boolean => {
    if (ssn.includes('-') || ssn.includes('A') ) {
        const splitter = ssn.includes('-') ? '-' : 'A';
        const parts = ssn.split(splitter);
        console.log(parts);
        if (isNaN(Number(parts[0])) || parts[0].length !== 6 || parts[1].length > 4 || parts[1].length < 3 ) 
            return false;
        return true;
    }
    return false;
};

export const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().refine(isSsn, {
        message: "Incorrect or missing ssn",
    }),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});


// export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
//     return newEntrySchema.parse(object);
//   };
