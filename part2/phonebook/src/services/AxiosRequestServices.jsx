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
  */
  const request = axios.get(serverUrl);
  return retPersons(request);
};

const updatePerson = async (person, newNumber) => {
  /* updating a person's contact info on server by ID 
  @param {object} person - person's contact info to update:
    {name: String, number: String, id: Number}
  @param {string} newNumber - the new number
  @returns {array} personArray - updated persons array from server:
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
  @param {object} person - person contact info:
    {name: String, number: String, id: Number}
  @returns {array} personArray - updated persons array from server:
    {name: String, number: String, id: Number}
  */
  await axios.post(serverUrl, person);
  const personsArray = await getPersons();
  return personsArray;
};

const removePerson = async (personID) => {
  /* removing person by id from persons array on server 
  @param {number} personID - the person's ID
  @returns {array || bool} personArray - updated array of persons from server:
    {name: String, number: String, id: Number}
    OR false in case no person with personID exists on server
  */
  const personEntryUrl = `${serverUrl}/${personID}`;
  let isSuccessful;

  isSuccessful = await axios
    .delete(personEntryUrl)
    .then(() => true)
    .catch(() => false);

  if (!isSuccessful) {
    return isSuccessful;
  }
  const persons = await getPersons();
  return persons;
};

const serverService = { getPersons, updatePerson, createPerson, removePerson };

export default serverService;
