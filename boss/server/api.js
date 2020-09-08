const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./minionRouter.js');
const ideasRouter = require('./ideasRouter');
const meetingsRouter = require('./meetingsRouter');
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db')

const app = require('../server');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
