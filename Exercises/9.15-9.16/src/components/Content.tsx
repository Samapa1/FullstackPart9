import Part from "./Part";
import { CoursePart } from "../types";

const Content = ( {courseParts} : { courseParts: CoursePart[]} )  => {
    return (
        <div>
        {courseParts.map(part => 
            <div key = {part.name}>
                <Part part={part}></Part>
            </div>
        )}
        </div>
    );
};

export default Content;