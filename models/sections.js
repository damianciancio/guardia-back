var mongoose = require('mongoose');

var SectionSchema = new mongoose.Schema({
    description: {type: String, required: true},
    beds: [{
        description: {
            type: String,
            required: true
        }
    }],
    active: {type: Boolean, required: true}
});

mongoose.model('Section', SectionSchema);