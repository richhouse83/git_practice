const express = require('express');
const apiRouter = express.Router();
const userRouter = require('./user');
const venueRouter = require('./venue');
const gigRouter = require('./gig');
const contactRouter = require('./contacts');
const transmissionRouter = require('./transmission');
const attendedRouter = require('./attended')


apiRouter.use('/user', userRouter);
apiRouter.use('/venue', venueRouter);
apiRouter.use('/gig', gigRouter);
apiRouter.use('/transmission', transmissionRouter);
apiRouter.use('/attended', attendedRouter);
apiRouter.use('/contacts', contactRouter);


module.exports = apiRouter;