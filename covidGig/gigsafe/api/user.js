const express = require('express');
const userRouter = express.Router();
const personSchema = require('../personSchema');
const mongoose = require('mongoose');



const User = mongoose.model('users', personSchema);

// get all users
userRouter.get('/', async (req, res) =>{
    const user = await User.find({});

try {
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
})

//get single user
userRouter.get('/getuser/:number/:passCode', async (req, res, next)=>{
    const user = await User.findOne({number: req.params.number, passCode:req.params.passCode});
    try {
        if(user){
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send()
    }
})

userRouter.post('/adduser', async (req, res, next)=>{
    try{
        const newUser = new User(req.body);
        await newUser.save((err, user)=>{
            if (err){
                next(err);
                res.status(500).send(err);
            } else if (!user){
                res.status(500).send('Error creating number');
            } else {
                res.status(201).send(`${user.number} successfully added`);
            }
        })
    } catch(err){
        console.log(err);
    }
})

userRouter.delete('/', async (req, res)=>{
    const userToDelete = await User.findOne(req.body);
    if(!userToDelete){
        res.status(404).send('User not found');
    }

    try{
        deleted = await User.findByIdAndDelete(userToDelete._id);
        if(!deleted){
            res.status(404).send("Could not complete action");
        } else res.status(204).send();
    } catch(err) {
        res.status(500).send(err);
    }
})

userRouter.patch('/', async (req, res)=>{
    /*
    const userToUpdate = await User.findOne(req.body);
    if(!userToUpdate){
        res.status(404).send('User not found');
    }
    try{
        
    }*/
})

module.exports = userRouter;