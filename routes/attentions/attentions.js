var router = require('express').Router();
var mongoose = require('mongoose');
var Attention = mongoose.model('Attention');
var Section = mongoose.model('Section');
var Job = mongoose.model('Job');

router.post('/', function(req, res){

    console.log(req.body);
    Section.findById(req.body.section_id)
    .then((section) => {
        if(!section) {
            res.sendStatus(300);
        }
    
        let attention = new Attention({
            section: section,
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

});

router.get('/', function(req, res, next){

    var filter = {};
    if (req.query.hasOwnProperty('only_pending') && req.query.only_pending) {
        filter = {'out_timestamp': null};
    }

    Attention.find(filter)
    .populate('section')
    .populate('pending_jobs.job')
    .lean()
    .then(attentions => {

        var sectionsCreatedIds = [];
        var sections = [];

        attentions.forEach(attention => {
            if (!sectionsCreatedIds.includes(attention.section._id)) {
                var section = Object.assign({},attention.section);
                section.attentions = [];
                sections.push(section);
                sectionsCreatedIds.push(attention.section._id);
            }

            var foundSection = sections.find((section) => {
                return section._id == attention.section._id;
            });
            if (foundSection) {
                foundSection.attentions.push(attention);
            }

            console.log(sectionsCreatedIds);

        });

        return res.json({
            'attentions': sections
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
        Job.findById(req.body.job_id)
        .then(job => {
            if(!job){ 
                return res.sendStatus(404); 
            }
            
            attention.pending_jobs.push(
                {
                    'job': job
                }
            );
    
            attention.save();
            res.send(attention);
        })
        .catch()
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