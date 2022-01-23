const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database.js');
const passport = require('passport');
const { user } = require('./key.js');
const nodemailer = require('nodemailer');

/* Inicializacion */
const app = express();
require('./lib/passport');
//require('./mailer');
//variables globales


//configuracion de servidor
app.set('web', 'desarrolloUMG');
app.set('port', process.env.PORT || 5010);

//Middlewares 
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require('./database.js');


//Inicializando passport
app.use(passport.initialize());
app.use(passport.session());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'pcacerosp@miumg.edu.gt', // generated ethereal user
        pass: 'generic', // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log("Listo para enviar correos!");
})


app.get('/', function (rect, res) {
    res.send('HOLAAAAA');
});

app.post('/api/email', async function (req, res) {
    try {
        await transporter.sendMail({
            from: '"MINISTERIO DE COMUNICACIONES, INFRAESTRUCTURA Y VIVIENDA 🏗" <civ@gob.com.gt>', // sender address
            to: `${req.body.payload.correo}`,
            subject: `[NOTIFICACIÓN] Se genero un ${req.body.payload.tiponame}`, // Subject line
            html: `<!DOCTYPE html><html><meta name="viewport" content="width=device-width, initial-scale=1"><body>
            <div style="width:50%;"><header class="w3-container w3-blue"><h1>${req.body.payload.name}</h1></header><div>
            <p>${req.body.payload.descripcion}</p></div><footer><h5>Alerta generada por el usuario:  ${req.body.payload.usuario}</h5></footer></div></body></html> `,
        });
        console.log(req.body.payload.correo);
        return res.send("Con exito");
    } catch (e) {
        console.log(e);
    }
});

app.post('/api/email/justificacion', async function (req, res) {
    try {
        await transporter.sendMail({
            from: '"MINISTERIO DE COMUNICACIONES, INFRAESTRUCTURA Y VIVIENDA 🏗" <civ@gob.com.gt>', // sender address
            to: `${req.body.payload.correo}`,
            subject: `[NOTIFICACIÓN] Se justifico un ${req.body.payload.tiponame}`, // Subject line
            html: `<!DOCTYPE html><html><meta name="viewport" content="width=device-width, initial-scale=1"><body>
            <div style="width:50%;"><header class="w3-container w3-blue"><h1>${req.body.payload.name}</h1></header><div>
            <p>${req.body.payload.descripcion}</p></div><footer><h5>Alerta generada por el usuario:  ${req.body.payload.usuario}</h5></footer></div></body></html> `,
        });
        console.log("Correo de justificacion");
        console.log(req.body);
        return res.send("Con exito");
    } catch (e) {
        console.log(e);
    }
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

app.get("/api/reportes", (req, res) => {
    db.query('SELECT * FROM REPORTE_PNC', (error, rows) => {
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
    db.query('SELECT * FROM PROCEDIMIENTO WHERE id = ? ', [req.params.id], (error, row) => {
        if (error) {
            throw error;
        } else {
            res.send(row);
        }
    })
});


app.get("/api/procedimientos/mejorada/:id", (req, res) => {
    db.query('SELECT tarea.`key`, tarea.figura, tarea.color, tarea.texto, tarea.tiempo,tarea.PROCEDIMIENTO_id, tarea.estado, tarea.color, tarea.descripcion,'
        + 'usuario.nombre, usuario.rol FROM tarea INNER JOIN usuario ON usuario.id=tarea.USUARIO_id WHERE PROCEDIMIENTO_id = ? AND tarea.tipo=1;', [req.params.id], (error, row) => {
            if (error) {
                throw error;
            } else {
                res.send(row);
            }
        })
});

app.get("/api/procedimientos/mejorada/op/:id", (req, res) => {
    db.query('SELECT tarea.`key`, tarea.figura, tarea.color, tarea.texto, tarea.tiempo,tarea.PROCEDIMIENTO_id, tarea.estado, tarea.color, tarea.descripcion,'
        + 'usuario.nombre, usuario.rol FROM tarea INNER JOIN usuario ON usuario.id=tarea.USUARIO_id WHERE PROCEDIMIENTO_id = ? AND tarea.tipo=2;', [req.params.id], (error, row) => {
            if (error) {
                throw error;
            } else {
                res.send(row);
            }
        })
});


app.get("/api/tareas/:id", (req, res) => {
    db.query('SELECT * FROM TAREA WHERE PROCEDIMIENTO_id = ? ', [req.params.id], (error, row) => {
        if (error) {
            throw error;
        } else {
            console.log(row);
            res.send(row);
        }
    })
});

app.get("/api/tareas/op/:id", (req, res) => {
    db.query('SELECT * FROM TAREA WHERE PROCEDIMIENTO_id = ? AND tipo=2 ', [req.params.id], (error, row) => {
        if (error) {
            throw error;
        } else {
            console.log(row);
            res.send(row);
        }
    })
});

app.get("/api/tareas/unica/:id", (req, res) => {
    db.query('SELECT * FROM TAREA WHERE `key` = ? ', [req.params.id], (error, row) => {
        if (error) {
            throw error;
        } else {
            console.log(row);
            res.send(row);
        }
    })
});
app.get("/api/enlace/:id", (req, res) => {
    db.query('SELECT * FROM ENLACE WHERE PROCEDIMIENTO_id = ? ', [req.params.id], (error, row) => {
        if (error) {
            throw error;
        } else {
            console.log(row);
            res.send(row);
        }
    })
});
app.get("/api/usuario/:id", (req, res) => {
    db.query('SELECT * FROM USUARIO WHERE id = ? ', [req.params.id], (error, row) => {
        if (error) {
            throw error;
        } else {
            console.log(row);
            res.send(row);
        }
    })
});

app.get("/api/valida/usuario/:username", (req, res) => {
    db.query('SELECT * FROM USUARIO WHERE username = ? ', [req.params.username], (error, row) => {
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
    db.query('INSERT INTO PROCEDIMIENTO SET ?', data, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    })
});

app.post("/api/reporte/agregar", (req, res) => {
    let data = {
        fecha: req.body.payload.fecha,
        PROCEDIMIENTO_id: req.body.payload.PROCEDIMIENTO_id,
        descripcion: req.body.payload.descripcion,
        usuario: req.body.payload.usuario,
        estatus: req.body.payload.estatus
    }
    console.log(req.body);
    db.query('INSERT INTO REPORTE_PNC SET ?', data, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    })
});

app.post("/api/reporte_tarea/agregar", (req, res) => {
    let data = {
           fecha: req.body.payload.fecha,
           anio: req.body.payload.anio, 
           mes: req.body.payload.mes, 
           semana: req.body.payload.semana, 
           procedimiento: req.body.payload.procedimiento, 
           usuario: req.body.payload.usuario, 
           puesto: req.body.payload.puesto, 
           encargado: req.body.payload.encargado,
           descripcion: req.body.payload.descripcion, 
           estado:  req.body.payload.estado, 
           estado_registro: req.body.payload.estado_registro, 
           tipo_flujo: req.body.payload.tipo_flujo,
    }
    console.log(req.body);
    db.query('INSERT INTO TAREA_REGISTRO SET ?',data, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    })
});

app.put("/api/tareas/actualizar/", (req, res) => {
    const { key } = req.body;
    const { descripcion } = req.body;
    console.log("Actulizando el sistema:")
    console.log(req.body);
    db.query("UPDATE TAREA SET DESCRIPCION= ?, ESTADO= ?, COLOR= ? , ASIGNADOPOR = ? WHERE `key`= ?", [req.body.payload.descripcion, req.body.payload.estado, req.body.payload.color,req.body.payload.asignadopor,req.body.payload.key], (error, result) => {
        if (error) {
            throw error;
        } else {
            console.log(result);
            res.send(result);
        }
    })
});

/* UPDATE ACTUAL STATE OF TABLA_REGISTRO UPDATE */
app.put("/api/registro_tarea/actualizar/", (req, res) => {
    console.log(req.body);
    db.query("UPDATE TAREA_REGISTRO SET DESCRIPCION= ?, ESTADO_REGISTRO= ? WHERE id= ?", [req.body.payload.descripcion, req.body.payload.estado_registro,req.body.payload.id], (error, result) => {
        if (error) {
            throw error;
        } else {
            console.log(result);
            res.send(result);
        }
    })
});
/* GET THE LAST ID */
app.get("/api/obtener/id/", (req, res) => {
    db.query('SELECT MAX(id) FROM tarea_registro', (error, row) => {
        if (error) {
            throw error;
        } else {
            console.log(row);
            res.send(row);
        }
    })
});

/* UPDATE LAST ID ON TASK TABLE */
app.put("/api/tarea/actualizar/ultimo/",(req, res) => {
    console.log(req.body);
    db.query("UPDATE TAREA SET ultima_tarea_id = ? WHERE `key`= ?", [req.body.payload.ultima_tarea_id,req.body.payload.key], (error, result) => {
        if (error) {
            throw error;
        } else {
            console.log(result);
            res.send(result);
        }
    })
});

/* ADD MAIL REGISTER */
app.post("/api/reporte_mail_registro/agregar/", (req, res) => {
    let data = {
          fecha: req.body.payload.fecha,
          anio: req.body.payload.anio,
          mes: req.body.payload.mes,
          semana: req.body.payload.semana,
          usuario: req.body.payload.usuario,
          puesto: req.body.payload.puesto,
          encargado: req.body.payload.encargado,
          correo: req.body.payload.correo,
          estado_correo: req.body.payload.estado_correo,
          procedimiento: req.body.payload.procedimiento,
          estado: req.body.payload.estado,
    }
    console.log(req.body);
    db.query('INSERT INTO CORREO_REGISTRO SET ?',data, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    })
});

/* ADD A NEW TASK (DESCONTINUADA)  */
app.post("/api/tarea/agregar", (req, res) => {
    let data = {
        tiempo: req.body.payload.tiempo,
        descripcion: req.body.payload.descripcion,
        estado: req.body.payload.estado,
        PROCEDIMIENTO_id: req.body.payload.PROCEDIMIENTO_id,
        USUARIO_id: req.body.payload.USUARIO_id,
    }
    console.log(req.body);
    db.query('INSERT INTO TAREA SET ?', data, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    })
});

//Start
app.listen(app.get('port'), () => console.log('Server is running on port: ' + app.get('port')));
