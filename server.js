const express = require('express');
const app = express();
const server = require('http').Server(app);


const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');



db.connect(config.dbUrl);
app.use(bodyParser.json());
app.use(cors());

const PORT = config.port;

socket.connect(server);
router(app);


app.use('/app', express.static('public'));
server.listen(PORT, function(){
    console.log('Escuchando en el puerto ' +  PORT);
});
