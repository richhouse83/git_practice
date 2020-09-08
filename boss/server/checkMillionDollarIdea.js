const checkMillionDollarIdea = (req, res, next) =>{
    const idea = req.body;
    //console.log(idea);
    const totalRevenue = Number(idea.numWeeks) * Number(idea.weeklyRevenue);
    //console.log(totalRevenue)
    const viable = totalRevenue >= 1000000 ? true : false;
    //console.log(viable);
    if (viable){
        console.log('idea is viable!')
        next();
    } else {
        res.status(400).send('Idea not worth a million dollars!')
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
