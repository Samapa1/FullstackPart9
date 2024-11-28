import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries } from './diaryService';
import Diary from './components/Diary';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  
  useEffect (() => {
    getAllDiaries().then(data => {
      console.log(data)
      setDiaryEntries(data)
    })
  }, [])

  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.map(entry => 
        <div key = {entry.id}>
         <Diary entryData= {entry}/> 
         </div>
      )}
    </div>
  );
};

export default App;
