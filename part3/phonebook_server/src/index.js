const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 4000;

app.use(express.json());
morgan.token("postParams", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postParams"
  )
); // used for logging the HTTP requests.

const phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons/:id", (request, response) => {
  // morgan("tiny");
  const id = request.params.id;
  const contact = phonebook.find((person) => person.id.toString() === id);
  if (contact) {
    response.json(contact);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const newID = Math.floor(Math.random() * 10000);
  const newName = request.body.name;
  const newNumber = request.body.number;
  if (!newName || !newNumber) {
    response
      .status(400)
      .json({ error: "Bad Format, missing name or number" })
      .end();
  } else if (phonebook.find((person) => person.name === newName)) {
    response
      .status(400)
      .json({ error: "Contact with the same name was found" })
      .end();
  }
  const newContact = {
    id: newID,
    name: newName,
    number: newNumber,
  };
  phonebook.push(newContact);
  response.status(200).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const toRemove = phonebook.find((person) => person.id.toString() === id);
  if (toRemove) {
    phonebook.splice(phonebook.indexOf(toRemove), 1);
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

app.get("/api/persons/", (request_unused, response) => {
  response.json(phonebook);
});

app.get("/info", (request_unused, response) => {
  const numberOfContacts = phonebook.length;
  const currentDate = new Date().toString();
  const contantCountHTML = `<h3>phonebook has info for
    ${numberOfContacts} contacts</h1>`;
  const dateHTML = `<h4>${currentDate}</h4>`;
  response
    .status(200)
    .send(contantCountHTML + dateHTML)
    .end();
});

app.listen(PORT, () => {
  console.log(`we are now running through port ${PORT}`);
});
