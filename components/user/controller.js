const store = require('./store')

function addUser(name){
    if(!name){
        return Promise.reject();
    }

    const user = {
        name,
    };
    return store.add(user);
}

function getUsers(){
    return new Promise((resolve, reject) => {
        lista = store.getAll();
        if(lista.length == 0){
            console.error('[getUsers] No hay usuarios para mostrar!');
            reject('No hay usuarios para mostrar');
            return false;
        }
        resolve(lista);
    });
}

module.exports = {
    addUser: addUser,
    getUsers: getUsers,
}