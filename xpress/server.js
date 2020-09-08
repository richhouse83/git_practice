const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errorhandler = require('errorhandler');
const apiRouter = require('./api/api');


app.use(bodyParser.json());
app.use(cors());
app.use(errorhandler())
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;



app.use('/api', apiRouter);

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}...`);
});

module.exports = app;