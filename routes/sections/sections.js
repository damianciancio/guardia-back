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

module.exports = router;