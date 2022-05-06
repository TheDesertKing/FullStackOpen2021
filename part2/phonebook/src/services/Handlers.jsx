/**
 * * Service file containing all button handlers
 */

const handlersFactory = (
  personsArray,
  setPersonsArray,
  newPersonName,
  setNewName,
  newPersonNum,
  setNewNum,
  serverService,
  setFilter
) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(personsArray)
        .map((person) => person.name)
        .includes(newPersonName)
    ) {
      alert(`${newPersonName} is already added to phonebook`);
    } else if (newPersonName === "" || newPersonNum === "") {
      alert("Both fields need values");
    } else {
      const newPerson = { name: newPersonName, number: newPersonNum };
      serverService
        .createPerson(newPerson)
        .then(() =>
          serverService.getPersons().then((data) => setPersonsArray(data))
        );
      setNewName("");
      setNewNum("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handlePersonDelete = async (personName, personID) => {
    let failed = 0;
    if (window.confirm(`Are you sure you want to delete ${personName}?`)) {
      // res = serverService.removePerson(personID).then((res) => console.log(res));
      const newPersonsArray = await serverService.removePerson(personID);
      setPersonsArray(newPersonsArray);
    }
    if (failed) {
      console.log("operation delete failed");
    }
  };

  const handlers = {
    handleSubmit: handleSubmit,
    handleNameChange: handleNameChange,
    handleNumChange: handleNumChange,
    handleFilterChange: handleFilterChange,
    handlePersonDelete: handlePersonDelete,
  };
  return handlers;
};

export default handlersFactory;
