const express = require('express');
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteAllFromDatabase,
  } = require('./db');

meetingsRouter = express.Router();
meetingsRouter.use('/:meetingId', (req, res, next,) =>{
   const meetingExists = getFromDatabaseById('meetings', req.params.meetingId);
   if (meetingExists){       
        req.meeting = meetingExists;
        req.meetingId = req.params.meetingId;
        next();
    } else {
        res.status(404).send("That meeting does not exist");
    }
})

meetingsRouter.get('/', (req, res, next) =>{
    res.status(200).send(getAllFromDatabase('meetings'));
});

meetingsRouter.get('/:meetingId', (req, res, next) =>{
    res.status(200).send(req.meeting);
})

meetingsRouter.put('/:meetingId', (req, res, next) => {
    const newmeeting = updateInstanceInDatabase('meetings', req.body);
    res.status(201).send(newmeeting);
})
meetingsRouter.delete('/', (req, res, next) => {
    console.log('deleting...');
    deleteAllFromDatabase('meetings');
    res.status(204).send('Delete successful');
})

meetingsRouter.post('/', (req, res, next) => {  
    const newmeeting = createMeeting();
    console.log(newmeeting);
    addToDatabase('meetings', newmeeting);
    //console.log(getAllFromDatabase('meetings'));
    res.status(201).send(newmeeting);
})

module.exports = meetingsRouter;