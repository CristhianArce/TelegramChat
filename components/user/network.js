const express = require('express');
const response = require('../../response');
const controller = require('./controller')

const router = express.Router();

router.post('/', function(req, res) {
    console.log('@POST creación de usuario');
    controller.addUser(req.body.name)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, 'No se pudo agregar el usuario', 500, e);
    })
    
});


router.get('/', function(req, res) {
    console.log('@GET listado de usuarios');
    controller.getUsers()
    .then((usersList) => {
        response.success(req, res, usersList, 200);
    })
    .catch(err => {
        response.catch(req, res, 'Not users found', 404, err);
    })
})

module.exports = router;