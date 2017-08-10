const db = require('./server/db/index')
let Promise = require('bluebird')

// _NAME = variables holding dummy data
const _users = [
  {
    name: 'Noor Grewal',
    email: 'noor@email.com',
    password: 'asleep',
    age: 26,
    gender: 'F'
  },
  {
    name: 'Dennis Bui',
    email: 'dennis@email.com',
    password: 'dude',
    age: 33,
    gender: 'M'
  },
  {
    name: 'Sulamita Morales',
    email: 'sulamita@email.com',
    password: 'river',
    age: 24,
    gender: 'F'
  },
  {
    name: 'Min Hwangbo',
    email: 'min@email.com',
    password: 'league',
    age: 32,
    gender: 'M'
  },
  {
    name: 'Tom Kelly',
    email: 'cody@email.com',
    password: 'cody',
    age: 35,
    gender: 'M'
  },
  {
    name: 'Jeff Kandel',
    email: 'jeff@email.com',
    password: 'bikes',
    age: 27,
    gender: 'M'
  },
  {
    name: 'John the Admin',
    email: 'john@email.com',
    password: 'tacos',
    age: 35,
    gender: 'M'
  },
  {
    name: 'Steve Stevenson',
    email: 'steve@email.com',
    password: 'hello',
    age: 99,
    gender: 'M'
  },
  {
    name: 'Lina Jones',
    email: 'lina@email.com',
    password: 'beer',
    age: 27,
    gender: 'F'
  },
  {
    name: 'Fara Wolf',
    email: 'wolf@email.com',
    password: 'wolves',
    age: 30,
    gender: 'F'
  },
  {
    name: 'Kevin Genus',
    email: 'kevin@email.com',
    password: 'voice',
    age: 44,
    gender: 'M'
  },
  {
    name: 'Shayne Mihalka',
    email: 'shayne@email.com',
    password: 'brooo',
    age: 37,
    gender: 'M'
  },
]


let seed = (_seedData, model) => {
  return Promise.map(_seedData, (data) => {
    return db.model(model).create(data)
  })
}

db.sync({force: true})
  .then(() => {
      console.log('Seeding Data')
  })
  .then(() => seed(_users, 'user'))
  .then(users => console.log(`Seeded ${users.length} users OK!`))
  .then(() => {
    console.log('Seeding complete!')
  })

  .catch((err) => {
    console.error('There was a problem seeding the database', err, err.stack)
  })
  .finally(() => {
    db.close()
    console.log('seed db connection closed OK!')
    return null
  })
