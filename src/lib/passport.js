const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; /* Haremos un logeo local */

                /* [Nombre] [Metodo]  */
passport.use('login.local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},async (req, username,password, done)=>{
    console.log("Soy el username" + username);
}));

/*passport.serializeUser((usr, done)=>{

})*/
