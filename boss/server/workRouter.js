const express = require('express');
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    getFromDatabaseByMinionId,
  } = require('./db');

workRouter = express.Router({mergeParams: true});
workRouter.use('/', (req, res, next) =>{
    const minionExists = getFromDatabaseById('minions', req.params.minionId);
    if (minionExists){      
        req.minion = minionExists;
        req.minionId = req.params.minionId;
        req.workArray = getFromDatabaseByMinionId(req.minionId);
        //console.log(req.minion);
        next();
    } else {
        res.status(404).send("That minion does not exist");
    }
})

workRouter.use('/:workId', (req, res, next,) =>{
    const workId = Number(req.params.workId);
    //console.log(workId);
    //console.log(req.workArray);
    const workExists = req.workArray.find(element =>{
        return Number(element.id) === workId;
    })
    console.log(workExists);
    if (workExists!== undefined){
        req.workId = req.params.workId;
        req.work = workExists;
        next();
    } else {
        //console.log('did not pass')
        res.status(404).send("That work does not exist");
    }
})

workRouter.get('/', (req, res, next) =>{
    //console.log(getFromDatabaseByMinionId(req.minionId));
    res.status(200).send(req.workArray);
});

workRouter.get('/:workId', (req, res, next) =>{
    res.status(200).send(req.work);
})

workRouter.put('/:workId', (req, res, next) => {
    //console.log(req.body);
    if (req.body.minionId === req.minionId){
        const newwork = updateInstanceInDatabase('work', req.body);
        res.status(201).send(newwork);
    } else {
        res.status(400).send();
    }

})
workRouter.delete('/:workId', (req, res, next) => {
    console.log('deleting...')
    deleteFromDatabasebyId('work', req.workId);
    res.status(204).send('Delete successful')
})

workRouter.post('/', (req, res, next) => {  
    const newwork = req.body;
    //console.log(newwork);
    addToDatabase('work', newwork);
    //console.log(getAllFromDatabase('work'));
    res.status(201).send(newwork);
})

module.exports = workRouter;