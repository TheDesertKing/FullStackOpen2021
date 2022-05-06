import axios from "axios";

const serverUrl = "http://localhost:4000/persons";

const retPersons = (promise) => {
  /* getting the data from result promise */
  return promise.then((res) => res.data);
};

const getPersons = () => {
  /* getting the persons array from the server 
  @returns {array} personArray - array of persons objects:
    {name: String, number: String, id: Number}
  */
  const request = axios.get(serverUrl);
  // console.log(request); //TODO - remove test
  return retPersons(request);
};

const putPerson = (person) => {
  //TODO fix this, it lacks id to swap person with
  /* swapping person from server with person param */
  const request = axios.put(serverUrl, person);
  return retPersons(request);
};

const createPerson = (person) => {
  /* inserting new person into persons array on server */
  const request = axios.post(serverUrl, person);
  return retPersons(request);
};

const removePerson = async (personID) => {
  /* removing person by id from persons array on server 
  @param {number} personID - ID of person to remove from persons array on server
  @returns {array} personArray - array of persons objects from server after removing person:
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
  persons = getPersons();
  return persons;
};

const serverService = { getPersons, putPerson, createPerson, removePerson };

export default serverService;
