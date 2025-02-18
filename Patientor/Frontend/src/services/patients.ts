import axios from "axios";
import { Patient, PatientFormValues } from "../types";
import { Entry, EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${String(id)}`
  );
  return data;

};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (object: EntryFormValues, id: string) => {
  // const entryObject = {
  //   healthCheckRating: 2, 
  //   ...object
  // };
  console.log(object);
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};


export default {
  getAll, create, addEntry, getOne
};

