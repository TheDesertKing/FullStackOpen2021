import axios from "axios";

const serverUrl = "http://localhost:4000/persons";

const retPersons = (promise) => {
  /* get the data from result promise of axios */
  return promise.then((res) => res.data);
};

const getPersons = () => {
  /* getting the persons array from the server 
  @returns {array} personArray - array of persons objects:
    {name: String, number: String, id: Number}
  @returns null
  */
  const request = axios.get(serverUrl);
  // console.log(request); //TODO - remove test
  return retPersons(request);
};

const updatePerson = async (person, newNumber) => {
  /* updating a person info on server by ID 
  @param {object} person - person info to update in format:
    {name: String, number: String, id: Number}
  @returns {array} personArray - updated array of persons from server:
    {name: String, number: String, id: Number}
  */
  person.number = newNumber;
  const personEntryUrl = `${serverUrl}/${person.id}`;
  await axios.put(personEntryUrl, person);
  const personsArray = await getPersons();
  return personsArray;
};

const createPerson = async (person) => {
  /* inserting new person into persons array on server 
  @param {object} person - person info to insert to server in format:
    {name: String, number: String, id: Number}
  @returns {array} personArray - updated array of persons from server:
    {name: String, number: String, id: Number}
  */
  // const personsArray = axios.post(serverUrl, person).then(() => getPersons());
  await axios.post(serverUrl, person);
  const personsArray = await getPersons();
  return personsArray;
};

const removePerson = async (personID) => {
  /* removing person by id from persons array on server 
  @param {number} personID - ID of person to remove from persons array on server
  @returns {array} personArray - updated array of persons from server:
    {name: String, number: String, id: Number}
  */
  const personEntryUrl = `${serverUrl}/${personID}`;
  let persons;

  await axios
    .delete(personEntryUrl)
    .catch((reason) =>
      console.log(
        `coulden't delete person with ID: ${personID}. perhaps he doesn't exist anymore? reason: ${reason}`
      )
    );
  persons = await getPersons();
  return persons;
};

const serverService = { getPersons, updatePerson, createPerson, removePerson };

export default serverService;
