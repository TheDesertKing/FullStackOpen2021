/**
 * * Service file containing all button handlers
 */

const handlersFactory = (
  personsArray,
  setPersonsArray,
  newPersonName,
  setNewPersonName,
  newPersonNum,
  setNewPersonNum,
  serverService,
  setFilter
) => {
  const updatePersonsArray = (newPersonsArray) => {
    setPersonsArray(newPersonsArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPersonName === "" || newPersonNum === "") {
      alert("Both fields need values");
    } else if (personsArray.some((person) => person.name === newPersonName)) {
      if (
        window.confirm(
          `${newPersonName} is already added to the phonebook, \ndo you want to change their number?`
        )
      ) {
        // const personToUpdate = { name: newPersonName, number: newPersonNum,id: id };
        const personToUpdate = personsArray.filter(
          (person) => person.name === newPersonName
        )[0];
        serverService
          .updatePerson(personToUpdate, newPersonNum)
          .then((newPersonsArray) => updatePersonsArray(newPersonsArray));
      }
    } else {
      const newPerson = { name: newPersonName, number: newPersonNum };
      serverService
        .createPerson(newPerson)
        .then((newPersonsArray) => updatePersonsArray(newPersonsArray));
      setNewPersonName("");
      setNewPersonNum("");
    }
  };

  const handleNameChange = (e) => {
    setNewPersonName(e.target.value);
  };
  const handleNumChange = (e) => {
    setNewPersonNum(e.target.value);
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
