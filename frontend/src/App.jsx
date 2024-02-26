import { useState,useRef, useEffect } from 'react'
import personService from './services/persons'


const RenderNewNumberForm = (props) => {

  if(props.selected !== null){
    return(
      <div class="add-numbers">
<h2>
  <em> Edit number </em> </h2>
<form onSubmit={props.updatePerson}>
    <div class="flex-name"> New name: <input
    value={props.newNameph}
    onChange = {props.nameFormHandler}
    size={props.newNameph.length > 20 ? props.newNameph.length : 20}/> </div> 
    <div class="flex-input">
      New number : <input
    value={props.newNumberph}
    onChange = {props.numberFormHandler}
    size={props.newNameph.length > 20 ? props.newNameph.length : 20} /> </div> 
    <div class="flex-input"> &nbsp; 
      <button className="top-form-button"
       type="submit">Submit </button>
      </div>
      <div class="flex-input">&nbsp;
      <button onClick={props.cancelSelectPerson} > Cancel 
        </button>
        </div>
        </form>
        </div>
    )
}
return (
  <div class="add-numbers">
  <h2>Phonebook</h2>
  <form onSubmit={props.addPerson}>
    <div class="flex-name"> name: <input
    value={props.newNameph}
    onChange = {props.nameFormHandler}
    size={props.newNameph.length > 20 ? props.newNameph.length : 20}/> </div> 
    <div class="flex-number">number: <input
    value={props.newNumberph}
    onChange = {props.numberFormHandler}
    size={props.newNameph.length > 20 ? props.newNameph.length : 20} /> </div> 
    <div class="flex-input"> &nbsp; 
      <button type="submit">add</button>
    </div>
  </form>
  </div>
  )
}

const RenderPhonebook = ({persons,removePerson, selectPerson}) => {
  return ( 
    <div >
      <h2> Numbers </h2>
      <div class="list-container">
  <ul class="centered-ul">
  {persons.map(person => 
    <RenderPerson 
    person={person} 
    key={person.name}
    removePerson = { () => removePerson(person.id)} 
    selectPerson = { () => selectPerson(person.id)}  /> )}
  </ul>
  </div>
  </div>
  )
}


const RenderPerson = ({person, removePerson, selectPerson}) => {
  return (
    <li class="flex-li">{person.name} {person.number}
    <div className="button-container">
     <button className="left-button"
    onClick={removePerson}>delete</button>
    <button className="right-button" onClick={selectPerson}> Select </button>
    </div>
     </li>
  )
}

const Notification = ({message}) => {
  if(message == null){
    return null
  }
  return(
  <div className="message">
    {message}
    </div>
  )
}

const ToggleNightMode = ({checked, onChange}) => {

  return (<div>
  <input type="checkbox" checked={checked} onChange={onChange} id="darkmode-toggle" />
  <label for="darkmode-toggle">

<svg class="sun" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.28451 10.3333C7.10026 10.8546 7 11.4156 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C11.4156 7 10.8546 7.10026 10.3333 7.28451" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 2V4" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 20V22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4 12L2 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 12L20 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19.7778 4.22266L17.5558 6.25424" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4.22217 4.22266L6.44418 6.25424" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M6.44434 17.5557L4.22211 19.7779" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19.7778 19.7773L17.5558 17.5551" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
</svg>

<svg class ="moon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
     </label>
     </div>)

}

function toggleDark () {
  var element = document.body;
  element.classList.toggle("dark-theme");
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
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)


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
          setErrorMessage(`${newName} was already added to phonebook`)
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

  const cancelSelectPerson = id => {
    setSelected(null)
    setNewName('')
    setNewNumber('')
  }

  const selectPerson = id => {
    
    const person = persons.filter((person) => person.id === id)
    if(selected === null){
      setSelected(id)
      const name = person[0].name
      const num = person[0].number
      setNewName(name)
      setNewNumber(num)
      console.log(`Selected person ${id}`)
      
    }
    else {
      /* Handle error here */
        setErrorMessage("Please cancel or finish editing before selecting another")
        setTimeout( () => {
          setErrorMessage(null)
        }, 3000)    
    }

  }

    const updatePerson = (event) => {
      event.preventDefault()
      console.log(selected)
      const id = selected
  
    const newPersonObj = { name : newName, number : newNumber }
    
     personService.update(id,newPersonObj).then(result => {
      setPersons(persons.map (person => person.id === id ? 
        {"name" : newName, "number" : newNumber, "id" : id} : person)) 
      setSelected(null)
    })
    setNewName('')
    setNewNumber('')


    }
    
  const handleChange = () => {
    setChecked(!checked);
    toggleDark(); }
  
  return(
    <div class="page-overview">
      <RenderNewNumberForm addPerson={addPerson}
       newNameph={newName} 
       newNumberph={newNumber}
       nameFormHandler={handleWriteName} 
       numberFormHandler={handleWriteNumber}
       selected={selected}
       updatePerson={updatePerson}
       cancelSelectPerson={cancelSelectPerson} />
       <div >
       <Notification message={errorMessage} />
       </div>
      <RenderPhonebook persons={persons}
      removePerson={removePerson}
      selectPerson={selectPerson} />
      <div class="relative-wrapper">
      <ToggleNightMode checked={checked} onChange={handleChange} />
      </div>
    </div>
  )
}

export default App