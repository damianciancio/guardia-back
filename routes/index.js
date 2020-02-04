var router=require('express').Router();

var passport = require('passport');

var jwt = require('express-jwt');
var auth = jwt({
    secret: 'clavesecreta',
    userProperty: 'payload'
});

router.use('/api/users', require('./users/users'));
router.use('/api/jobs', auth, require('./jobs/jobs'));
router.use('/api/attentions', auth, require('./attentions/attentions'));
router.use('/api/sections', auth, require('./sections/sections'));

module.exports = router;