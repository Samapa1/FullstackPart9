import axios from 'axios';
import { DiaryEntry } from './types';
import { NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export const createDiaryEntry = async (object: NewDiaryEntry) => {  
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
    
  }
  catch(error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      return error.response?.data;
    } 
    else {
      console.log(error);
    }
  }
};
