const Persons = ({ personArray, filter, handleDelete }) => {
  return personArray
    .filter((person) => person.name.includes(filter))
    .map((person) => (
      <div key={person.name + " div"}>
        <h4 key={person.name}>
          {person.name} {person.number}
          <button
            onClick={() => handleDelete(person.name, person.id)}
            key={person.name + "button"}
          >
            delete contact
          </button>
        </h4>
      </div>
    ));
};

export default Persons;
