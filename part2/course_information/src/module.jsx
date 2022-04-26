const Header = ({ course }) => { return <h2>{course}</h2> }
const Part = ({ partName, exercisesCount }) => {
  return (<p>{partName} {exercisesCount}</p>)
}
const Content = ({ partArray }) => {
  let ret = []
  for (let i = 0; i < partArray.length; i++) {
    ret.push(<Part key={i} partName={partArray[i].name} exercisesCount={partArray[i].exercises} />)
  }
  return <>{ret}</>
}
const Total = ({ partArray }) => {
  let totalExercises = partArray.reduce((curr, next) => ({ exercises: curr.exercises + next.exercises }))['exercises']
  return <p>total of {totalExercises} exercises</p>
}
const Course = ({ courseName, parts }) => {
  return (
    <>
      <Header course={courseName} />
      <Content partArray={parts} />
      <Total partArray={parts} />
    </>
  )
}

export default Course