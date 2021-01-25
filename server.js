const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./network/routes');



db.connect('mongodb://localhost:27017/telegrom-improve');

const PORT = 3000;
var app = express();

app.use(bodyParser.json());
router(app);


app.use('/app', express.static('public'));
app.listen(PORT);
console.log('Escuchando en el puerto ' +  PORT)