const mongoose = require('mongoose');
const personSchema = require('./personSchema');
const gigSchema = require('./gigSchema');
const venueSchema = require('./venueSchema');

const connectionString = "mongodb+srv://richhouse83:beehive1@cluster0.vfvmg.mongodb.net/covid_gig?retryWrites=true&w=majority";

mongoose.connect(connectionString, {useNewUrlParser: true});

const Person = mongoose.model('person', personSchema);
const Gig = mongoose.model('gigs', gigSchema);
const Venue = mongoose.model('venues', venueSchema);

const addVenue = new Venue({ name: 'The Manchester Apollo', capacity: 3500, address: 'Stockport Rd, Manchester' } )
const addPerson = new Person({number: '07793020106', passCode: 9300})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  Gig.find((err, gig)=>{
      if(err){
          return console.error(err);
      }
      console.log(gig);
  })
  addPerson.save((err, person)=>{
    if (err){
        console.error(err);
    }
    if (person){
        console.log(`${person.number} successfully added to list`);
    } else {
        console.log('An Error has occurred, the number could not be added');
    }
  })
  addVenue.save((err, venue)=>{
    if (err){
        console.error(err);
    }
    if (venue){
        console.log(`${venue.name} successfully added to list`);
    } else {
        console.log('An Error has occurred, the venue could not be added');
    }
  })
  Venue.find((err, venues)=>{
    if(err){
        return console.error(err);
    }
    console.log(venues);
})
});