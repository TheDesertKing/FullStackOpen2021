const Header = ({ course }) => { return <h1>{course}</h1> }
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
  // for readability
  let totalExercises = 0
  partArray.forEach(part => {
    totalExercises += part.exercises
  })
  // or like this
  let tots = partArray.reduce((curr, next) => ({ exercises: curr.exercises + next.exercises }))['exercises']
  // cause im a fan of oneliners
  return <p>Number of exercises {totalExercises}</p>
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content partArray={parts} />
      <Total partArray={parts} />
    </div>
  )
}

export default App