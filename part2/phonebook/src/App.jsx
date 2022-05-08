import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import serverService from "./services/AxiosRequestServices";
import handlersFactory from "./services/Handlers";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [personsArray, setPersonsArray] = useState([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonNum, setNewPersonNum] = useState("");
  const [filter, setFilter] = useState("");
  const [notifMessage, setNotifMessage] = useState({
    message: "",
    isError: true,
  });

  const handlers = handlersFactory(
    personsArray,
    setPersonsArray,
    newPersonName,
    setNewPersonName,
    newPersonNum,
    setNewPersonNum,
    serverService,
    setFilter,
    setNotifMessage
  );

  useEffect(() => {
    const initialGetPersons = async () => {
      return await serverService
        .getPersons()
        .then((data) => setPersonsArray(data));
    };
    initialGetPersons();
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <Notification
        message={notifMessage["message"]}
        isError={notifMessage["isError"]}
      />
      <div>
        <h3>Filter:</h3>
        <Filter value={filter} changeHandler={handlers.handleFilterChange} />
      </div>
      <br />
      <Form
        name={newPersonName}
        number={newPersonNum}
        nameHandler={handlers.handleNameChange}
        numberHandler={handlers.handleNumChange}
        submitHandler={handlers.handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        setPersonArray={setPersonsArray}
        personArray={personsArray}
        filter={filter}
        handleDelete={handlers.handlePersonDelete}
      />
    </>
  );
};

export default App;
