const express = require('express');
const artistsRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

artistsRouter.param('artistId',(req, res, next, artistId)=>
{
    numId = Number(artistId)
    db.get(`SELECT * FROM Artist WHERE Artist.id = ${numId}`, (err, row)=>{
        if (err){
            next(err);
        } else if(row){
            req.artistId = numId
            req.artist = row
            next()
        } else {
            res.status(404).send(`${artistId} not found`);
        }
    })
});

artistsRouter.get('/', (req, res, next)=>{
    db.all('SELECT * FROM Artist WHERE is_currently_employed = 1', (err, rows)=>
    {
        if(err){
            next(err)
        } else {
            res.status(200).json({ artists: rows});
        }
    })
});

artistsRouter.post('/', (req, res, next)=>{
    const newArtist = req.body.artist;
    //console.log(newArtist);
    if(newArtist.name && newArtist.dateOfBirth && newArtist.biography){
        const isCurrentlyEmployed = newArtist.isCurrentlyEmployed === 0? 0: 1;
        //console.log(isCurrentlyEmployed)
        //console.log(newArtist);
        db.run(`INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ('${newArtist.name}', '${newArtist.dateOfBirth}', '${newArtist.biography}', ${isCurrentlyEmployed});`, function(err){

            if (err){
                console.log('err after insert')
                next(err)               
            } else 
            db.get(`SELECT * FROM Artist WHERE id=${this.lastID}`, (err, row)=>{
                //console.log(row);
                console.log('Created')
                res.status(201).json({artist: row});
            })
        }); 
    } else {
        console.log('Not valid object')
        res.status(400).send();
    }
})

artistsRouter.put('/:artistId', (req, res, next)=>{
    const updatedArtist = req.body.artist
    if(updatedArtist.name && updatedArtist.dateOfBirth && updatedArtist.biography){
        db.run(`UPDATE Artist SET name='${updatedArtist.name}', date_of_birth='${updatedArtist.dateOfBirth}', biography='${updatedArtist.biography}', is_currently_employed=${updatedArtist.isCurrentlyEmployed} WHERE id = ${req.artistId}`, err =>{
            if(err){
                next(err);
                console.log(err);
            } else db.get(`SELECT * FROM Artist WHERE id = ${req.params.artistId}`, (err, row)=>{
                console.log('Updated')
                res.status(200).json({artist: row});
            });
        })
    } else res.status(400).send();

});

artistsRouter.delete('/:artistId', (req, res, next)=>{
    db.get(`SELECT * FROM Artist WHERE id = ${req.artistId}`, (err, row)=>{
        if(err){
            next(err);
        } else {
            console.log('Deleting')
            db.run(`UPDATE Artist SET is_currently_employed=0 WHERE id=${req.artistId}`, (err)=>{
                if(err){
                    next(err);
                } else {
                    db.get(`SELECT * FROM Artist WHERE id =${req.artistId}`, (err, row)=>{
                        res.status(200).json({artist: row});
                    })
                    
                };
            })
        }
    })
})

artistsRouter.get('/:artistId', (req, res, next)=>{
    res.status(200).json({ artist: req.artist});
    console.log(req.artist);
})

module.exports = artistsRouter;