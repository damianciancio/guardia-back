var mongoose = require('mongoose');

var AttentionSchema = new mongoose.Schema({
    section: {type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true},
    bed: {
        description: {type:String}
    },
    patient_name: {type: String, required: true},
    patient_age: {type: Number, required: true},
    medical_condition: {type: String, required: true},
    service: {type: String, required: true},
    in_timestamp: {type: Date, required: true},
    out_timestamp: {type: Date},
    pending_jobs:[
        {
            description: {type: String, required: true},
            done: {type: Boolean, required: true}
        }
    ]
});

mongoose.model('Attention', AttentionSchema);