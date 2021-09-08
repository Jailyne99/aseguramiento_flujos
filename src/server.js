const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database.js');

//Inicializacion    
const app = express();


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
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
     }
    db.query('INSERT INTO PROCEDIMIENTO SET ?',data, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    })
});

//Start
app.listen(app.get('port'), () => console.log('Server is running on port: ' + app.get('port')));