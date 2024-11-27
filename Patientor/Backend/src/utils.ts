import { NewPatientEntry } from './types';
import { Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNotNumber = (argument: unknown): boolean =>
    isNaN(Number(argument));

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing dateOfBirth:' + date);
    }
    return date;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const isSsn = (ssn: string): boolean => {
    if (ssn.includes('-') || ssn.includes('A') ) {
        const splitter = ssn.includes('-') ? '-' : 'A';
        const parts = ssn.split(splitter);
        console.log(parts);
        if (isNotNumber(parts[0]) || parts[0].length !== 6 || parts[1].length > 4 || parts[1].length < 3 ) 
            return false;
        return true;
    }
    return false;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn) ) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
        
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newEntry;
    }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;


