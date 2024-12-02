import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries } from './diaryService';
import { createDiaryEntry } from './diaryService';
import Diary from './components/Diary';
import Notification from './components/Notification';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect (() => {
    getAllDiaries().then(data => {
      setDiaryEntries(data);
    });
  }, []);

  const handleErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const visibilitySelected = (value: string) => {
    setVisibility(value);
  };

  const weatherSelected = (value: string) => {
    setWeather(value);
  };

  const entryCreation = async (event: React.SyntheticEvent) => {
    const newEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    };
    event.preventDefault();
    const data = await createDiaryEntry(newEntry);
    console.log(data);
    if (data && data.id) {
      setDiaryEntries(diaryEntries.concat(data));
    }
    else {
      handleErrorMessage(data);
    }
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
    };
  
  return (
    <div>
      <h2>Add a new entry</h2>
      <Notification message={error} />
      <form onSubmit={entryCreation}>
        <label htmlFor="start">date</label>
        <input 
          type="date" 
          id="start" 
          name="entry-start" 
          value={date} 
          onChange={(event) => setDate(event.target.value)} 
          min="1990-01-01" 
          max="2024-12-02"
        />
        <br></br>
        visibility 
        <input 
          type="radio" 
          name="visibility" 
          onChange={() => visibilitySelected("great")} 
          checked={visibility === "great"}
        />
        <label htmlFor="great">great</label>
        <input 
          type="radio"
          name="visibility"
          onChange={() => visibilitySelected("good")} 
          checked={visibility === "good"}
        />
        <label htmlFor="good">good</label>
        <input 
          type="radio" 
          name="visibility" 
          onChange={() => visibilitySelected("ok")} 
          checked={visibility === "ok"}
        />
        <label htmlFor="ok">ok</label>
        <input 
          type="radio" 
          name="visibility" 
          onChange={() => visibilitySelected("poor")} 
          checked={visibility === "poor"}
        />
        <label htmlFor="poor">poor</label>
        <br></br>
        weather
        <input 
          type="radio" 
          name="weather" 
          onChange={() => weatherSelected("sunny")} 
          checked={weather === "sunny"}
        />
        <label htmlFor="sunny">sunny</label>
        <input 
          type="radio" 
          name="weather" 
          onChange={() => weatherSelected("rainy")} 
          checked={weather === "rainy"}
        />
        <label htmlFor="rainy">rainy</label>
        <input 
          type="radio" 
          name="weather" 
          onChange={() => weatherSelected("cloudy")} 
          checked={weather === "cloudy"}
        />
        <label htmlFor="cloudy">cloudy</label>
        <input 
          type="radio" 
          name="weather" 
          onChange={() => weatherSelected("stormy")} 
          checked={weather === "stormy"}
        />
        <label htmlFor="stormy">stormy</label>
        <br></br>
        comment
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)} 
        />
        <br></br>
        <button type='submit'>add</button>
      </form>
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
