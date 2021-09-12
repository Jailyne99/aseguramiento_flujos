const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database.js');
const passport = require('passport');
const path = require('path');

//Inicializacion    
const app = express();
require('./lib/passport');

//variables globales


//configuracion de servidor
app.set('views', path.join(__dirname, 'views'));
app.set('web', 'desarrolloUMG');
app.set('port', process.env.PORT || 5010);

//Middlewares --> accion app
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require('./database.js');
/* Inicializando passport */

app.use(passport.initialize());
app.use(passport.session());


app.get('/', function (rect, res) {
    res.send('HOLAAAAA');
});

app.get("/api/procedimientos", (req, res) => {
    db.query('SELECT * FROM PROCEDIMIENTO', (error, rows) => {
        if (error) {
            throw error;
        } else {
            res.send(rows);
        }
    })
});

app.get("/api/procedimientos/:id", (req, res) => {
    db.query('SELECT * FROM PROCEDIMIENTO WHERE id = ? ',[req.params.id] , (error, row) => {
        if (error) {
            throw error;
        } else {
            res.send(row);
        }
    })
});

app.post("/api/procedimientos/agregar", (req, res) => {
    let data = {
        nombre: req.body.payload.nombre,
        descripcion: req.body.payload.descripcion,
     }
    db.query('INSERT INTO PROCEDIMIENTO SET ?',data,(error, result) => {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    })
});


console.log(__dirname);
console.log(path.join(app.get('views'),'/Home'));



app.post("/api/login",
passport.authenticate('login.local')
,(req,res)=>{
    console.log(req.body.payload);
    console.log(req.user.username);
    res.send("Estas autenticado");
});



/*app.post("/api/procedimientos/ingresar", passport.authenticate('loginLocal',{
        successRedirect: path.join(app.get('views'),'/Home'),
        failureRedirect: "/login"
}));*/



//Start
app.listen(app.get('port'), () => console.log('Server is running on port: ' + app.get('port')));