const express = require('express');
const transmissionRouter = express.Router();
const gigSchema = require('../gigSchema');
const venueSchema = require('../venueSchema');
const personSchema = require('../personSchema');
const mongoose = require('mongoose');

const Gig = mongoose.model('gigs', gigSchema);
const Venue = mongoose.model('venues', venueSchema);
const User = mongoose.model('user', personSchema);

mongoose.set('useFindAndModify', false);


// to update person's transmission status, then add to all gig information, allowing contact tracing to begin
transmissionRouter.put('/',(req, res)=>{
    if(!req.body.number || !req.body.passCode){
        res.status(400).send('Invalid Request');
    }
    console.log(req.body);
    User.findOne(req.body,(err, userToUpdate)=>{
        if(err){
            next(err);
            res.status(500).send(err);
        }
        if(!userToUpdate){
            console.log('issue1')
            res.status(404).send("Could not find User to update");
        } else {
            //Currently toggles status, update after tests.
            User.findByIdAndUpdate(userToUpdate._id, {"transmission": !userToUpdate.transmission}, (err, updated)=>{
                if(err){
                    next(err)
                    res.status(500).send(err);
                }
                if(!updated){
                    res.status(400).send('Error updating');
                } else {
                    const gigArray = updated.gigs_attended
                    gigArray.forEach(async gig => {
                        // Currently toggles status, update after tests
                        await Gig.updateOne({"_id": gig}, ({transmission_reported: !userToUpdate.transmission}), (err, gigUpdated)=>{
                            if(err){
                                next(err);
                                res.status(500).send(err);
                            } else {
                                console.log('completed')
                            }
                        })
                    })
                    res.status(200).send('Information updated');
                }
            });

        }
    });
        
        
        
    
})


module.exports = transmissionRouter;