var router = require('express').Router();
var mongoose = require('mongoose');
var Section = mongoose.model('Section');

router.post('/', function(req, res){

    console.log(req.body);

    let section = new Section({
        description: req.body.description,
        beds: req.body.beds,
        active: true
    });

    section.save();
    res.send(section);
});

router.get('/', function(req, res, next){
    Section.find({})
    .then(sections => {
        return res.json({
            'sections': sections
        });
    })
    .catch(next);
});

router.get('/:id', function(req, res, next){
    var section_id = req.params.id;
    Section.findById(section_id)
    .then(section => {
        if (!section) {
            return res.sendStatus(404).send("unexistent section");
        }
        return res.json({
            'section': section
        });
    })
    .catch(next);
});

router.put('/', function(req, res, next){

    var section_new_data = req.body.section;

    Section.findById(section_new_data._id)
    .then((section) => {
        
        if (!section) {
            return res.sendStatus(404).send('section not found');
        }

        for (var field in section_new_data) {
            if(section_new_data[field] !== undefined && field !== '_id' && field !== '__v') {
                section[field] = section_new_data[field];
            }
            
        }

        section.save();
        return res.json({
            'section': section
        });

    });
});

module.exports = router;