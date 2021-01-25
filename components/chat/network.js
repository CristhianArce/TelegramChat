const express = require('express');
const response = require('../../response');
const controller = require('./controller')

const router = express.Router();


router.post('/', function(req, res) {
    console.log('@POST creación de un nuevo chat');
    controller.createChat(req.body)
    .then((chat) =>{
        response.success(req, res, chat, 201);
    })
    .catch(e => {
        response.error(req, res, 'No se pudo crear el chat', 400, e);
    }) 
});


router.get('/', function(req, res){
    console.log('@GET listado de chats');
    controller.listChats()
    .then((chats) => {
        response.success(req, res, chats, 200);
    })
    .catch(e => {
        response.error(req, res, 'No se pudieron encontrar chats', 400, e);
    })
})

module.exports = router;