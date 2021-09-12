const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signup',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},async(req,username,password,done) =>{
    console.log('noches' + req.body);
    console.log('soy yo');
}));
