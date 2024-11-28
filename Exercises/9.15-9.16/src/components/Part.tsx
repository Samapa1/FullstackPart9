import { CoursePart } from "../types"

const Part = ( {part} : { part: CoursePart} ) => {
    {switch(part.kind){
        case "basic":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <em>{part.description}</em>
                </p>
            )
        case "background":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <em>{part.description}</em>
                    <br />
                    submit to {part.backgroundMaterial}
                </p>
            )
        case "group":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    project exercises {part.groupProjectCount}
                </p>
            )
        case "special":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    required skills: {part.requirements.join(', ')}
                </p>
            )
    }}
}

export default Part