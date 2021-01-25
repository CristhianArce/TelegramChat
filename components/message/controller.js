const { list } = require('./store');
const store = require('./store')
const socket = require('../../socket').socket;

function addMessage(chat, user, message, file){
    return new Promise((resolve, reject) => {
        
        if(!user || !message){
            console.error('[messageController] No hay usuario o mensaje');
            reject('Los datos son incorrectos!');
            return false;
        }

        let filePath = '';
        if(file){
            filePath = 'http://localhost:3000/app/files/' + file.filename;
        }
        const fullMessage = {
            user: user,
            message: message,
            chat: chat,
            date: new Date(),
            file: filePath
            
        }
        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    });
}


function getMessages(filterMessageByChat){


    return new Promise((resolve, reject) => {
        lista = store.list(filterMessageByChat);
        if(lista.length === 0){
            console.error('[getMessages] No hay mensajes disponibles!');
            reject('No hay mensajes disponibles');
            return false;
        }
        resolve(lista);
    });
}


function updateMessage(id, text){
    return new Promise(async (resolve, reject) =>{
        if(!id || !text){
            console.error('[updateMessage] No se pudo actualizar el mensaje!')
            reject('Datos invalidos');
            return false;
        }
        const result = await store.updateText(id, text);
        resolve(result);
    });
}

function deleteMessage(id){
    return new Promise((resolve, reject) => {
        if(!id){
            console.error('[deleteMessage] No se pudo actualizar el mensaje!')
            resolve('Id invalido');
            return false;
        }

        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    });
}


module.exports ={
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,

}