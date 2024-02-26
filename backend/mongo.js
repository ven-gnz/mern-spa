const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_URI


if(process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://kangasotso:${password}@testcluster.aukrvpf.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema(
  { name : String,
  number : String, }
)
const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){

  Person.find({}).then(result => {
    console.log("Phonebook: ")
    result.forEach(person => {
      console.log({person})
    })
    mongoose.connection.close()
  })
}

if(process.argv.length > 3){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} saved!`)
    mongoose.connection.close()
  }) 

}





