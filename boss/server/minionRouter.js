const express = require('express');
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');
const workRouter = require('./workRouter');

minionRouter = express.Router();

minionRouter.use('/:minionId', (req, res, next,) =>{
   const minionExists = getFromDatabaseById('minions', req.params.minionId);
   if (minionExists){       
        req.minion = minionExists;
        req.minionId = req.params.miniondId;
        next();
    } else {
        res.status(404).send("That minion does not exist");
    }
})

minionRouter.use('/:minionId/work', workRouter);

minionRouter.get('/', (req, res, next) =>{
    res.status(200).send(getAllFromDatabase('minions'));
});

minionRouter.get('/:minionId', (req, res, next) =>{
    res.status(200).send(req.minion);
})

minionRouter.put('/:minionId', (req, res, next) => {
    const newMinion = updateInstanceInDatabase('minions', req.body);
    res.status(201).send(newMinion);
})
minionRouter.delete('/:minionId', (req, res, next) => {
    console.log('deleting...')
    deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send('Delete successful')
})

minionRouter.post('/', (req, res, next) => {  
    const newMinion = req.body;
    //console.log(newMinion);
    addToDatabase('minions', newMinion);
    //console.log(getAllFromDatabase('minions'));
    res.status(201).send(newMinion);
})

module.exports = minionRouter;