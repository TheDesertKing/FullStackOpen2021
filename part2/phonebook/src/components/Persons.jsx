const Persons = ({ personArray, filter, handleDelete }) => {
  return personArray
    .filter((person) => person.name.includes(filter))
    .map((person) => (
      <div key={person.name + " div"}>
        <h4 key={person.name}>
          {person.name} {person.number}
        </h4>
        <button
          onClick={() => handleDelete(person.name, person.id)}
          key={person.name + "button"}
        >
          delete contact
        </button>
      </div>
    ));
};

export default Persons;
