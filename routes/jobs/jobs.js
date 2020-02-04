var router = require('express').Router();
var mongoose = require('mongoose');
var Job = mongoose.model('Job');

router.post('/', function(req, res){
    console.log
    let job = new Job({
        description: req.body.description
    });

    job.save();
    res.send(job);
});

router.get('/', function(req, res, next){
    Job.find({})
    .then(jobs => {
        return res.json({
            'jobs': jobs
        });
    })
    .catch(next);
});

module.exports = router;