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
  setFilter,
  setNotifMessage
) => {
  const updatePersonsArray = (newPersonsArray) => {
    /* updates the personsArray state to newPersonsArray 
    @param {array} newPersonsArray - persons array for PersonsArray state:
      {name: String, number: String, id: Number}
    @returns null
    */
    setPersonsArray(newPersonsArray);
  };

  const handleSubmit = (e) => {
    /* handles submit of new contact to phonebook 
    @param {object} e - submitEvent of the submiting form
    @returns null
    */
    e.preventDefault();

    if (newPersonName === "" || newPersonNum === "") {
      alert("Both fields need values");
    } else if (personsArray.some((person) => person.name === newPersonName)) {
      if (
        window.confirm(
          `${newPersonName} is already added to the phonebook, \ndo you want to change their number?`
        )
      ) {
        // update a person's contact information in the phonebook
        const personToUpdate = personsArray.filter(
          (person) => person.name === newPersonName
        )[0];
        serverService
          .updatePerson(personToUpdate, newPersonNum)
          .then((newPersonsArray) => updatePersonsArray(newPersonsArray))
          .then(() =>
            setNotifMessage({
              message: `${personToUpdate.name}'s number has been updated!`,
              isError: false,
            })
          );
      }
    }
    // add a person's contact information to the phonebook
    else {
      const newPerson = { name: newPersonName, number: newPersonNum };
      serverService
        .createPerson(newPerson)
        .then((newPersonsArray) => updatePersonsArray(newPersonsArray))
        .then(() =>
          setNotifMessage({
            message: `${newPerson.name}'s number has been added to the phonebook!`,
            isError: false,
          })
        );
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
    /* removes a person's contact information from the phonebook
    @param {string} personName - the person's name
    @param {number} personID - the person's ID
    @returns null
    */
    if (window.confirm(`Are you sure you want to delete ${personName}?`)) {
      const newPersonsArray = await serverService.removePerson(personID);
      if (newPersonsArray === false) {
        setNotifMessage({
          message: `coulden't remove ${personName}, he doesn't exist in the phonebook!`,
          isError: true,
        });
      } else {
        setNotifMessage({
          message: `successfully removed ${personName} from the phonebook!`,
          isError: false,
        });
        setPersonsArray(newPersonsArray);
      }
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
