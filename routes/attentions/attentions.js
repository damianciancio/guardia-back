var router = require('express').Router();
var mongoose = require('mongoose');
var Attention = mongoose.model('Attention');

router.post('/', function(req, res){

    console.log(req.body);

    let attention = new Attention({

        section: req.body.section_id,
        bed: {
            description: req.body.bed
        },
        patient_name: req.body.patient_name,
        patient_age: req.body.patient_age,
        medical_condition: req.body.medical_condition,
        service: req.body.service,
        in_timestamp: new Date(),
    });

    attention.save();
    res.send(attention);
});

router.get('/', function(req, res, next){
    Attention.find({})
    .populate('section')
    .populate('pending_jobs.job')
    .then(attentions => {
        return res.json({
            'attentions': attentions
        });
    })
    .catch(next);
});

router.put('/pending-jobs/:id', function(req, res, next){
    let attention_id = req.params.id;

    Attention.findById(attention_id)
    .then(attention => {
        if(!attention){ 
            return res.sendStatus(404); 
        }

        attention.pending_jobs.push(
            {
                'job': req.body.job_id
            }
        );

        attention.save();
        res.send(attention);
    })
    .catch(next);
});

router.put('/:id/close', function(req, res, next){
    let attention_id = req.params.id;

    Attention.findById(attention_id)
    .then(attention => {
        if (!attention) {
            res.sendStatus(404);
        }

        attention.out_timestamp = new Date();
        attention.save();
        res.send(attention);
    })
    .catch(next);

})

module.exports = router;