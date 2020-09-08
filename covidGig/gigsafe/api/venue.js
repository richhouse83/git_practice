const express = require('express');
const venueRouter = express.Router();
const venueSchema = require('../venueSchema');
const mongoose = require('mongoose');

const Venue = mongoose.model('venues', venueSchema);
//find all venues
venueRouter.get('/', async (req, res)=>{
    const venues = await Venue.find();
    if(!venues){
        res.send(404).send('No venues found');
    }
    try {
        res.status(200).send(venues);
      } catch (err) {
        res.status(500).send(err);
      }
})

//find and return single venue
venueRouter.get('/findvenue', async (req, res)=>{
    const venue = await Venue.find(req.body);
    if(!venue){
        res.send(404).send('No such venue found');
    }
    try {
        res.status(200).send(venue);
      } catch (err) {
        res.status(500).send(err);
      }
})

// create a new venue
venueRouter.post('/addvenue', async (req, res)=>{
    const newVenue = new Venue(req.body);

    newVenue.save((err, venue)=>{
        if (err){
            console.error(err);
        }
        if (!venue){
            console.error('Venue could not be added');
            res.status(500).send('Venue could not be created');
        } else {
            res.status(201).send(`${venue.name} successfully created`);
        }
    })
})

//delete venue

venueRouter.delete('/', async (req, res)=>{
    const venueToDelete = await Venue.findOne(req.body);
    if(!venueToDelete){
        res.status(404).send('Venue does not exist');
    }
    
    try{
        const deleted = await Venue.findByIdAndDelete(venueToDelete._id);
        if(!deleted){
            res.status(404).send("Could not complete action");
        } else res.status(204).send();
        } catch(err) {
            console.log(err);
            res.status(500).send(err);
        }
})

module.exports = venueRouter;