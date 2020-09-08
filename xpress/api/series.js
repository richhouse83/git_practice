const express = require('express');
const seriesRouter = express.Router();
const sqlite3 = require('sqlite3');
const { NamedModulesPlugin } = require('webpack');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
const issuesRouter = require('./issues');

seriesRouter.use('/:seriesId/issues', issuesRouter);

seriesRouter.param('seriesId',(req, res, next, seriesId)=>
{
    numId = Number(seriesId)
    db.get(`SELECT * FROM Series WHERE Series.id = ${numId}`, (err, row)=>{
        if (err){
            next(err);
        } else if(row){
            req.seriesId = numId
            req.series = row
            next()
        } else {
            res.status(404).send(`${seriesId} not found`);
        }
    })
});

seriesRouter.get('/', (req, res, next)=>{
    db.all('SELECT * FROM Series', (err, rows)=>
    {
        if(err){
            next(err)
        } else {
            res.status(200).json({ series: rows});
        }
    })
});

seriesRouter.get('/:seriesId', (req, res, next)=>{
    res.status(200).json({ series: req.series});
    console.log(req.series);
})

seriesRouter.post('/', (req, res, next)=>{
    const newSeries = req.body.series;
    console.log(newSeries);
    if (newSeries.name && newSeries.description){
        db.run(`INSERT INTO Series(name, description) VALUES('${newSeries.name}', '${newSeries.description}')`, function(err){
            if (err){
                next(err);
            } else {
                db.get(`SELECT * FROM Series WHERE id = ${this.lastID}`, (err, row)=>{
                    res.status(201).json({series: row});
                })
            } 
        })
    } else res.status(400).send();
})

seriesRouter.put('/:seriesId', (req, res, next)=>{
    const newSeries = req.body.series;
    console.log(newSeries);
    if (newSeries.name && newSeries.description){
        db.run(`UPDATE Series SET name='${newSeries.name}', description='${newSeries.description}' WHERE id=${req.seriesId}`, function(err){
            if (err){
                next(err);
            } else {
                db.get(`SELECT * FROM Series WHERE id = ${req.seriesId}`, (err, row)=>{
                    res.status(200).json({series: row});
                })
            } 
        })
    } else res.status(400).send();
})

seriesRouter.delete('/:seriesId', (req, res, next)=>{
    console.log('deleting...')
    db.all(`SELECT * FROM Issue WHERE series_id = ${numId}`, (err, row)=>{
        if(err){
            console.log(err)
            next(err);
        } else if (row.length > 0){
            //console.log(row);
            res.status(400).send();
        } else {
            db.run(`DELETE FROM Series WHERE id=${numId}`, err=>{
                if(err){
                    console.log(err);
                } else res.status(204).send();
            });

        }
    })
})
 module.exports = seriesRouter;