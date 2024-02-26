const express = require('express')
const app = express()
var morgan = require('morgan')
var logger = morgan('tiny')
app.use(logger)
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())



let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]



const generateId = () => {
  return Math.floor(Math.random() * (persons.length))
}

app.get('/',(req,res) => {
  res.send("<h1>Phonebook</h1>")
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (request, response) => {
  const personcount = persons.length
  const d = new Date()
  response.send(`<p> Phonebook has info for ${personcount} people </p>
  <p>${d.toString()} </p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id)
  if (person) { response.json(person.number) }
  else { response.status(404).end()}
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons',(request, response) => {
  
  const body = request.body
  const name = body.name
  const number = body.number
  if(name == null | number == null){ response.status(400).end() }
  if(persons.some(person => person.name === name)) {
    response.status(400).json({
    error : '${name} already present in phonebook'}) }

  var newId = Math.floor(Math.random() * 15)
  if(persons.some(person => person.id === newId)){
    newId = persons.length + 1
  }

  const newPersonObj = {
    name: name,
    number : number,
    id: newId
  }
  persons = persons.concat(newPersonObj)
  console.log(newId)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



