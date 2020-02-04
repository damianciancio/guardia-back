var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    description: {type: String, required: true}
});

mongoose.model('Job', JobSchema);