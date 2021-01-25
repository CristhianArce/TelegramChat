const express = require('express');
const multer = require('multer');

const response = require('../../response');
const controller = require('./controller');

const router = express.Router();

const upload = multer({
    dest: 'public/files/',

});

router.get('/', (req,res) =>{
    const filterMessageByChat = req.query.chat || null;

    filterMessageByChat !==null ? 
    console.log('@GET Listado de mensajes del chat ' + filterMessageByChat) : 
    console.log('@GET Listado de mensajes');

    controller.getMessages(filterMessageByChat)
    .then((lista) => {
        // console.log(lista);
        response.success(req, res, lista, 200);
    })
    .catch(e => {
        response.error(req, res, "Not messages found", 400);
    })
    ;
});


router.post('/', upload.single('file'), (req,res) => {
    console.log('@POST Agregando Mensaje');
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
        response.success(req, res, fullMessage, 201);
    })
    .catch(e => {
        response.error(req, res, 'Información Invalida', 400, 'Error en el controlador!');
    })
    ;
});

router.patch('/:id', (req,res) => {
    console.log('@PATCH Actualización de mensaje');
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req,res,'Not possible to patch message', 500, e);
    })
});


router.delete('/:id', (req,res) => {
    console.log('@DELETE Eliminación de mensaje');
    controller.deleteMessage(req.params.id)
    .then(() => {
        response.success(req, res, 'Mensaje eliminado con éxito', 200);
    })
    .catch(e => {
        response.error(req,res,'Error interno, intentando eliminar mensaje', 500, e);
    })

    
});


module.exports = router;