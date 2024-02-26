const express = require('express')
const app = express()
var morgan = require('morgan')
var logger = morgan('tiny')
app.use(logger)
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
require('dotenv').config()


const errorHandler = (error,request,response,next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}



const Person = require('./models/person')

let persons = []

app.get('/',(req,res) => {
  res.send("<h1>Phonebook</h1>")
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/info', (request, response) => {
  const personcount = persons.length
  const d = new Date()
  response.send(`<p> Phonebook has info for ${personcount} people </p>
  <p>${d.toString()} </p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).
  then(person => {
    if(person) { response.json(person) }
    else { response.status(404).end() }}).
    catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
Person.findByIdAndDelete(request.params.id).
then(result => {
  response.status(204).end()})
  .catch(error => next(error))
})

app.put('/api/persons/:id',(request,response,next) => {
  const body = request.body

  const person = {name : body.name, number: body.number}
  console.log(request.params)
  Person.findByIdAndUpdate(request.params.id, person, {new: true}
    ).then(updatedPerson => {response.json(updatedPerson)}).catch(error => next(error))

})

app.post('/api/persons',(request, response, next) => {
  
  const body = request.body
  const name = body.name
  console.log(name)
  const number = body.number
  if(name == null | number == null){ response.status(400).end() }
  if(persons.some(person => person.name === name)) {

    const samePerson = person
    console.log(samePerson)
    next(samePerson) }

  const person = new Person({
    name: name,
    number : number,
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)





