const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database.js');
const passport = require('passport');

//Inicializacion    
const app = express();
require('./lib/passport');


//variables globales


//configuracion de servidor
app.set('web', 'desarrolloUMG');
app.set('port', process.env.PORT || 5010);

//Middlewares --> accion app
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require('./database.js');

//Inicializando passport
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

app.get("/api/tareas", (req, res) => {
    db.query('SELECT * FROM TAREA', (error, rows) => {
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
app.get("/api/tarea/:id", (req, res) => {
    db.query('SELECT * FROM TAREA WHERE id = ? ',[req.params.id] , (error, row) => {
        if (error) {
            throw error;
        } else {
            console.log(row);
            res.send(row);
        }
    })
});

app.post("/api/procedimientos/agregar", (req, res) => {
    let data = {
        nombre: req.body.payload.nombre,
        descripcion: req.body.payload.descripcion,
     }
     console.log(req.body);
    db.query('INSERT INTO PROCEDIMIENTO SET ?',data, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    })
});

app.post("/api/tarea/agregar", (req, res) => {
    let data = {
        tiempo: req.body.payload.tiempo,
        descripcion: req.body.payload.descripcion,
        estado: req.body.payload.estado,
        PROCEDIMIENTO_id: req.body.payload.PROCEDIMIENTO_id,
        USUARIO_id: req.body.payload.USUARIO_id,
     }
     console.log(req.body);
    db.query('INSERT INTO TAREA SET ?',data, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    })
});

app.post("/api/procedimientos/ingresar", passport.authenticate('local.signup',{
    successRedirect: '/Home', /* A donde lo envia si la autentificación es exitosa */
    failureRedirect: '/api/procedimientos/ingresar',
}));

//Start
app.listen(app.get('port'), () => console.log('Server is running on port: ' + app.get('port')));