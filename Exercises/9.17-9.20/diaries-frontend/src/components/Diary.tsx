import { DiaryEntry } from "../types";

const Diary = ( {entryData} : {entryData: DiaryEntry}) => {
    return (
        <p>
            <b>{entryData.date}</b>
            <br></br>
            visibility: {entryData.visibility}
            <br></br>
            weather: {entryData.weather}
        </p>
    )
}

export default Diary;

