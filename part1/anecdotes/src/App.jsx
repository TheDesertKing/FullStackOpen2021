import { useState } from 'react'

const DisplayMostVotedQuote = ({ top, anecdotes }) => {
  if (top === -1) {
    return (<p>No votes yet</p>)
  }
  else {
    return (<p>{anecdotes[top]}</p>)
  }
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [top, setTop] = useState(-1)
  const voteForQuote = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    let topQuoteIdx = copy.indexOf(Math.max(...copy))
    if (topQuoteIdx !== top) { setTop(topQuoteIdx) }
  }
  const regenerateQuote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }


  return (
    <div>
      {anecdotes[selected]} <br />
      <p>has {votes[selected]} votes</p> <br />
      <button onClick={voteForQuote}>vote</button>
      <button onClick={regenerateQuote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <DisplayMostVotedQuote top={top} anecdotes={anecdotes} />
    </div>
  )
}

export default App