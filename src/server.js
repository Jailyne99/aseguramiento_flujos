const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const cors = require('cors');


//Inicializacion    
const app = express();


//variables globales


//configuracion de servidor
app.set('web','desarrolloUMG');
app.set('port', process.env.PORT || 4000);

//Middlewares --> accion app
app.use(cors());
app.use(morgan('dev'));
app.get('/', function(rect,res){
    res.send('HOLAAAAA');
});

app.get("/list_movies", (req, res) => {
    fs.readFile(__dirname + '/' + 'movies.json', 'utf8', (err, data) => {
        res.end(data);
    });
});


//Start
app.listen(app.get('port'),()=> console.log('Server is running on port: ' + app.get('port') ));