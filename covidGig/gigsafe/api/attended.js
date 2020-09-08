const express = require('express');
const attendedRouter = express.Router();
const gigSchema = require('../gigSchema');
const venueSchema = require('../venueSchema');
const personSchema = require('../personSchema');
const mongoose = require('mongoose');

const Gig = mongoose.model('gigs', gigSchema);
const Venue = mongoose.model('venues', venueSchema);
const User = mongoose.model('user', personSchema);

//TODO push an attended gig onto the users array

attendedRouter.put('/', async (req, res, next)=>{
    let userToUpdate = {};
    let gigToFind = {};
    venueName = req.body.venue_name;
    artistName = req.body.artist;
    if(!req.body.number || !req.body.passCode){
        res.status(400).send('Invalid Request');
    }
    //get users info
    userToUpdate = await User.findOne({ "name": req.body.name, "passCode": req.body.passCode }, async (err, user)=>{
        if (err){
            next(err);
            res.status(500);
        } else {
            console.log(user);
            await Venue.findOne({"name": venueName}, async (err, venue)=>{
                if(err){
                    next(err);
                    res.status(500);
                } else {
                    gigToFind = { "artist": artistName, "venue_id": `${venue._id}`};
                    console.log(gigToFind);
                    await Gig.findOne(gigToFind, (err, gig)=>{
                        if(err){
                            next(err);
                            res.status(500);
                        } else {
                            console.log(gig);
                            userToUpdate.gigs_attended.push(gig._id);
                            userToUpdate.save((err, updated)=>{
                                if(err){
                                    next(err);
                                    res.status(500);
                                } else {
                                    res.status(200).send(updated);
                                }
                            })
                        };
                    });
                }
            });
        }
    });
    /*
    //get show id 
    try{
        const venue = await Venue.findOne({"name": venueName});
        if(!venue){
            res.status(404).send('Could not find venue of show');
        } else {
            //res.status(200).send(venue);
        }
    } catch(err){
        res.status(500).send(err);
    }
    try {
        const gig = await Gig.findOne({"artist": artistName, "venue_id": venue._id});
        if(!gig){
            res.status(404).send('Could not find gig');
        } else {
            gigId = gig._id;
        }
    } catch(err) {
        res.status(500).send(err);
    }
    // push gig Id onto users attended array
    userToUpdate.gigs_attended.push(gigId);
    try{
        const updated = await userToUpdate.save();
        if(!updated){
            res.status(400).send('Error updating');
        } else res.status(200).send(`Gig attendance for ${userToUpdate.number} successfully updated`);
    } catch(err){
        res.status(500).send(err);
    }*/
})


module.exports = attendedRouter;