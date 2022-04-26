import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({ val, changeHandler }) => <input value={val} onChange={changeHandler} />
const Form = ({ name, number, nameHandler, numberHandler, submitHandler }) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input value={name} onChange={nameHandler} /> <br />
        number: <input value={number} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Persons = ({ personArray, filter }) => {
  return personArray.filter(person => person.name.includes(filter)).map(person => (<h4 key={person.name}>{person.name} {person.number}</h4>))
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(persons).map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({ 'name': newName, 'number': newNum }))
      setNewName('')
      setNewNum('')
    }
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumChange = (e) => {
    setNewNum(e.target.value)
  }
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:4000/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <h3>Filter:</h3>
        <Filter value={filter} changeHandler={handleFilterChange} />
      </div>
      <br />
      <Form name={newName} number={newNum} nameHandler={handleNameChange} numberHandler={handleNumChange} submitHandler={handleSubmit} />
      <h2>Numbers</h2>
      <Persons personArray={persons} filter={filter} />
    </div>
  )
}

export default App