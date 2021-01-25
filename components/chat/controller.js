const store = require('./store');

function createChat(userList){
    if(!userList || userList.length === 0){
        return new Promise.reject();
    }

    const users = {
        users: userList,
    };

    return store.createChat(users);
}

function listAllChats(){
    return new Promise((resolve, reject) => {
        lista = store.getChats();
        if(lista.length === 0){
            console.error('[listAllChats] No hay chats para mostrar');
            reject('No hay chats para mostrar');
            return false;
        }
        resolve(lista);
    });
}


module.exports = {
    createChat: createChat,
    listChats: listAllChats,
}