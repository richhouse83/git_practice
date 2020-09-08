const express = require('express');
const contactRouter = express.Router();
const gigSchema = require('../gigSchema');
const venueSchema = require('../venueSchema');
const personSchema = require('../personSchema');
const mongoose = require('mongoose');

const Gig = mongoose.model('gigs', gigSchema);
const User = mongoose.model('user', personSchema);


// gets numbers for all potential contacts of a case.
contactRouter.get('/', async (req, res, next)=>{
    let contactArray = [];
    let gigsArray = [];
    let numberArray = [];
    await Gig.find({transmission_reported: true})
    .then(gigs => {
            if(gigs){
                gigs.forEach(gig =>{
                    gigsArray.push(gig);
                    })
            
            }
        })
    //console.log(gigsArray);
    await Promise.all(gigsArray.map(async gig=>{
        await User.find({gigs_attended: gig._id}, (err, userArray)=>{
            userArray.forEach(user =>{
                contactArray.push(user);
            })
        })
    }))
    contactArray.forEach(user=>{
        numberArray.push(user.number);
    })
    const uniqueSet = new Set(numberArray);
    const finalArray = [...uniqueSet];
    
    res.status(200).send(finalArray);
    return finalArray;    
})

module.exports = contactRouter;