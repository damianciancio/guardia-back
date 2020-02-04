var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username'
        }, function(username, password, done){
            User.findOne({ username: username }, function(err, user){
                if(err){
                    return done(err);
                }

                if(!user){
                    return done(null, false, {
                        message: "Usuario no encontrado"
                    });
                }

                if(!user.validPassword(password)){
                    return done(null, false, {
                        message: "Contraseña incorrecta"
                    });
                }
                
                return done(null, user);
            })          
        }
    )
)