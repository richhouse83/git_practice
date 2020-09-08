const express = require('express');
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter = express.Router();
ideasRouter.use('/:ideaId', (req, res, next,) =>{
   const ideaExists = getFromDatabaseById('ideas', req.params.ideaId);
   if (ideaExists){       
        req.idea = ideaExists;
        req.ideaId = req.params.ideaId;
        next();
    } else {
        res.status(404).send("That idea does not exist");
    }
})

ideasRouter.get('/', (req, res, next) =>{
    res.status(200).send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res, next) =>{
    res.status(200).send(req.idea);
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    const newidea = updateInstanceInDatabase('ideas', req.body);
    res.status(201).send(newidea);
})
ideasRouter.delete('/:ideaId', (req, res, next) => {
    console.log('deleting...')
    deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send('Delete successful')
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {  
    const newidea = req.body;
    //console.log(newidea);
    addToDatabase('ideas', newidea);
    //console.log(getAllFromDatabase('ideas'));
    res.status(201).send(newidea);
})

module.exports = ideasRouter;