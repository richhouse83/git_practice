const express = require('express');
const issuesRouter = express.Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const { NamedModulesPlugin } = require('webpack');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

issuesRouter.use('/', (req, res, next)=>{
    req.seriesId = Number(req.params.seriesId);
        if(req.body.issue){
            req.issue = req.body.issue
            //console.log(req.issue);
        }
    next();
})

issuesRouter.get('/', (req, res, next)=>{
    //console.log(req.seriesId);
    db.all(`SELECT * FROM Issue WHERE series_id = ${req.seriesId}`, (err, rows)=>{
        if (err){
            next(err);
        } else {
            //console.log(rows);
            res.status(200).json({issues: rows});
        }
    })
})

issuesRouter.post('/', (req, res, next)=>{
    if(!req.issue.name || !req.issue.issueNumber || !req.issue.publicationDate || !req.issue.artistId){
        console.log('Not valid')
        res.status(400).send('Not valid');
    } else {
        db.all(`SELECT * FROM Artist WHERE id = ${req.issue.artistId}`, (err)=>{
            if (err){
                res.status(400).send(err);
            }
        })
        //console.log('creating');
        //console.log(req.issue);
        //console.log(req.seriesId);
        db.serialize(()=>{
            db.run(`INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id) VALUES ('${req.issue.name}', ${req.issue.issueNumber}, '${req.issue.publicationDate}', ${req.issue.artistId}, ${req.seriesId})`, function(err){
                if (err){
                    //console.log(err);
                    next(err);
                }
            console.log('created')
            db.get(`SELECT * FROM Issue WHERE id = ${this.lastID}`, (err, row)=>{
                    if (err){
                        //console.log(err);
                        next(err);
                    } else {
                        //console.log('sending to client', row);
                        res.status(201).json({issue: row});
                    }
                })
            })
        })
    }
})

issuesRouter.param('issueId', (req, res, next, issueId)=>{
    const issueExists = Number(issueId);
    db.get(`SELECT * FROM Issue WHERE id=${issueExists}`, (err, row)=>{
        if (err){
            console.log(err);
            next(err);
        } else if (row === undefined){
            res.status(404).send();
        } else {
            console.log('checked... ok')
            next();
        }
    })
})

issuesRouter.put('/:issueId', (req, res, next)=>{
    if(!req.issue.name || !req.issue.issueNumber || !req.issue.publicationDate || !req.issue.artistId){
        console.log('Not valid')
        res.status(400).send('Not valid');
    } else {
        const issueId =  Number(req.params.issueId);
        db.serialize(()=>{
            console.log('updating', req.issue, Number(req.params.issueId))
            db.run(`UPDATE Issue SET name='${req.issue.name}', issue_number=${req.issue.issueNumber}, publication_date='${req.issue.publicationDate}', artist_id=${req.issue.artistId} WHERE id=${issueId}`, (err)=>{
                if(err){
                    console.log(err);
                    next(err);
                } else {
                    db.get(`SELECT * FROM Issue WHERE id =${issueId}`, (err, row)=>{
                        if(err){
                            console.log(err);
                            next(err);
                        } else {
                            console.log('updated');
                            res.status(200).json({issue:row});
                        }
                    }
                    )
                }
            })
        })
    }
})

issuesRouter.delete('/:issueId', (req, res, next)=>{
    db.run(`DELETE FROM Issue WHERE id=${req.params.issueId}`, (err)=>{
        if (err){
            console.log(err);
            next(err);
        } else {
            console.log('Deleted');
            res.status(204).send();
        }
    })
})

module.exports = issuesRouter;