const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; /* Haremos un logeo local */

                /* [Nombre] [Metodo]  */
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},async (req, username,password, done)=>{
    console.log(req.body);
}));

/*passport.serializeUser((usr, done)=>{

})*/
