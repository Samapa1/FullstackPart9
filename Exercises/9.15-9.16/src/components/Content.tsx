interface CoursePart {
    name: string;
    exerciseCount: number;
  }

const Content = ( {courseParts} : { courseParts: CoursePart[]} )  => {
    return (
        <div>
        {courseParts.map(part => 
        <p>{part.name} {part.exerciseCount} </p>
        )}
        <p>
        </p>
        </div>
    )
}

export default Content