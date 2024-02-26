import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const RenderNewNumberForm = (props) => {
return (
  <div class="add-numbers">
  <h2>Phonebook</h2>
  <form onSubmit={props.addPerson}>
    <div class="flex-input"> name: <input
    value={props.newNameph}
    onChange = {props.nameFormHandler}/> </div> 
    <div class="flex-input">number: <input
    value={props.newNumberph}
    onChange = {props.numberFormHandler} /> </div> 
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </div>
  )
}

const RenderPhonebook = ({persons,removePerson}) => {
  return ( 
    <div >
      <h2> Numbers </h2>
      <div class="list-container">
  <ul class="centered-ul">
  {persons.map(person => 
    <RenderPerson 
    person={person} 
    key={person.name}
    removePerson = { () => removePerson(person.id)} /> )}
  </ul>
  </div>
  </div>
  )
}

const RenderPerson = ({person, removePerson}) => {
  return (
    <li class="flex-li">{person.name} {person.number} <button
    onClick={removePerson}>delete</button> </li>
  )
}

const Notification = ({message}) => {
  if(message == null){
    return null
  }
  return(
  <div className="error">
    {message}
    </div>
  )
}

const App = () => {

  useEffect( () => {
    personService.getAll().
    then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleWriteName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleWriteNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(item => item.name === newName)){
      personService.update().
      catch(
        error => {
          setErrorMessage(`${newName} is already added to phonebook`)
          setTimeout( () => {
            setErrorMessage(null)
          }, 3000)
        })
    return
    } 

    const personObj = { name: newName, number : newNumber };
    personService.create(personObj).
    then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
    }).then(error => {
          setErrorMessage(`${newName} was succesfully added to phonebook`)
          setTimeout( () => {
            setErrorMessage(null)
          }, 3000)
        })
  }

  const removePerson = id => {

    const person = persons.filter((person) => person.id === id)
    const name = person[0].name
    personService.remove(id).then(
      setPersons(persons.filter((person) => !(person.id === id)  )
      )).then(
        error => {
          setErrorMessage(`${name} removed from contacts`)
          setTimeout( () => {
            setErrorMessage(null)
          }, 3000)
        })

        return
    
  }

  return (
    <div class="page-overview">
      
      <RenderNewNumberForm addPerson={addPerson}
       newNameph={newName} 
       newNumberph={newNumber}
       nameFormHandler={handleWriteName} 
       numberFormHandler={handleWriteNumber} />
       <div >
       <Notification message={errorMessage} />
       </div>
      <RenderPhonebook persons={persons}
      removePerson={removePerson} />
    </div>
  )
}

export default App