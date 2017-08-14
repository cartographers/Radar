const db = require('./server/db/index')
let Promise = require('bluebird')

// _NAME = variables holding dummy data
const _users = [
  {
    name: 'Noor Grewal',
    email: 'noor@email.com',
    password: 'asleep',
    age: 26,
    gender: 'F',
    sales: 3000
  },
  {
    name: 'Dennis Bui',
    email: 'dennis@email.com',
    password: 'dude',
    age: 33,
    gender: 'M',
    sales: 5000
  },
  {
    name: 'Sulamita Morales',
    email: 'sulamita@email.com',
    password: 'river',
    age: 24,
    gender: 'F',
    sales: 6000
  },
  {
    name: 'Min Hwangbo',
    email: 'min@email.com',
    password: 'league',
    age: 32,
    gender: 'M',
    sales: 2500
  },
  {
    name: 'Tom Kelly',
    email: 'cody@email.com',
    password: 'cody',
    age: 35,
    gender: 'M',
    sales: 10000
  },
  {
    name: 'Jeff Kandel',
    email: 'jeff@email.com',
    password: 'bikes',
    age: 27,
    gender: 'M',
    sales: 5000
  },
  {
    name: 'John the Admin',
    email: 'john@email.com',
    password: 'tacos',
    age: 35,
    gender: 'M',
    sales: 9500
  },
  {
    name: 'Steve Stevenson',
    email: 'steve@email.com',
    password: 'hello',
    age: 99,
    gender: 'M',
    sales: 500
  },
  {
    name: 'Lina Jones',
    email: 'lina@email.com',
    password: 'beer',
    age: 27,
    gender: 'F',
    sales: 3000
  },
  {
    name: 'Fara Wolf',
    email: 'wolf@email.com',
    password: 'wolves',
    age: 30,
    gender: 'F',
    sales: 4000
  },
  {
    name: 'Kevin Genus',
    email: 'kevin@email.com',
    password: 'voice',
    age: 44,
    gender: 'M',
    sales: 5500
  },
  {
    name: 'Shayne Mihalka',
    email: 'shayne@email.com',
    password: 'brooo',
    age: 37,
    gender: 'M',
    sales: 7000
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
