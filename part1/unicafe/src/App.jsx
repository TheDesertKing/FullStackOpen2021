import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = ({ type }) => {
    let clickHandler
    if (type === 'good') clickHandler = () => setGood(good + 1)
    if (type === 'neutral') clickHandler = () => setNeutral(neutral + 1)
    if (type === 'bad') clickHandler = () => setBad(bad + 1)
    return (
      <button onClick={clickHandler}>{type}</button>
    )
  }
  const StatisticLine = ({ type, count }) => {
    return (
      <tr>
        <td>{type}</td>
        <td>{count}</td>
      </tr>
    )
  }
  const Statistics = () => {
    if (good > 0 || neutral > 0 || bad > 0) {
      return (
        <table>
          <tbody>
            <StatisticLine type='good' count={good} />
            <StatisticLine type='neutral' count={neutral} />
            <StatisticLine type='bad' count={bad} />
            <StatisticLine type='average' count={(good - bad) / (good + neutral + bad)} />
            <StatisticLine type='positive' count={(100 * good / (good + neutral + bad)).toString() + ' %'} />
          </tbody>
        </table>
      )
    }
    else { return <h2>No feedback given</h2> }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button type='good' />
      <Button type='neutral' />
      <Button type='bad' />
      <Statistics />
    </div>
  )
}

export default App