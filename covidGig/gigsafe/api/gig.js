const express = require('express');
const gigRouter = express.Router();
const gigSchema = require('../gigSchema');
const mongoose = require('mongoose');
const venueSchema = require('../venueSchema');
const { nextTick } = require('process');

const Gig = mongoose.model('gigs', gigSchema);
const Venue = mongoose.model('venues', venueSchema);

//get all gigs
gigRouter.get('/', async (req, res)=>{
    const gigs = await Gig.find({});
    if(!gigs){
        res.status(404).send('Error, could not find any gigs')
    }
    try {
        res.status(200).send(gigs);
      } catch (err) {
        res.status(500).send(err);
      }
})

// find a single gig ERROR

gigRouter.get('/findgig', async (req, res)=>{
    let newQuery = {};
    if(!req.body.artist || !req.body.venue_name){
        res.status(404).send('invalid request')
    } 
        await Venue.findOne({"name": req.body.venue_name}, async (err, venue)=>{
            if(err){
                next(err);
                res.status(500);
            } else {
                //console.log(venue._id)
                newQuery = { artist: req.body.artist, venue_id: venue._id};
                console.log(newQuery)
                await Gig.findOne(newQuery, async (err, gig)=> {
                    if(err){
                        next(err);
                        res.status(500);
                    } else {
                        if(!gig){
                            console.log('Gig not found')
                            res.status(404).send('Gig not found')
                        } else res.status(200).send(gig);
                    }
                });
            }
        });
})

// Add a gig - searches for venue
gigRouter.post('/addgig', async (req, res)=>{
    let newGig = {};
    try{
        const venue = await Venue.findOne({"name": req.body.venue_name});
        if(!venue._id){
            res.status(404).send('Could not find venue of show');
        } else {
            newGig = { "artist": req.body.artist, "date": req.body.date, "venue_id": venue._id};
            const createdGig = new Gig(newGig);
            createdGig.save((err, gig)=>{
                if(err){
                    console.error(err);
                    res.status(500).send(err);
                } 
                res.status(201).send('Gig Created')
            })
        }
    } catch(err){
        console.log(err);
    }
})


//delete a gig searches for venue
gigRouter.delete('/', async (req, res)=>{
    const venue = await Venue.findOne({"name": req.body.venue_name});
    if(!venue){
        res.status(404).send('Invalid request'); 
    } else {
        try{
            const gigToDelete = await Gig.findOne({"artist": req.body.artist, "venue_id": venue._id});
            if(!gigToDelete._id){
                res.status(400).send();
            } else {
                const deleted = await Gig.findByIdAndDelete(gigToDelete._id);
                if (!deleted){
                    res.status(400).send();
                } else res.status(204).send();
            }
            
        } catch(err){
            console.error(err);
        }
    }
})
module.exports = gigRouter;