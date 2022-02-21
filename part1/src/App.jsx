const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      id: 1,
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      id: 2,
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      id: 3,
      name: 'State of a component',
      exercises: 14
    }
  ]
  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  const Content = () => {
    let components = []
    parts.forEach((part) => {
      components.push(<Part key={part.id} part={part.name} exercises={part.exercises} />)
    })
    return (
      <div>
        {components}
      </div>
    )
  }
  const Total = (props) => {
    let numberOfExercises = parts.reduce((val, next) => {
      console.log('val: ', val.exercises, ' next: ', next.exercises)
      return { exercises: val.exercises + next.exercises }
    })['exercises']
    return (
      <p>
        Number of exercises {numberOfExercises}
      </p>
    )
  }

  return (
    <>
      <Header course={course} />
      <Content />
      <Total />
    </>
  )

}

export default App