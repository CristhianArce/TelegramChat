const Model = require('./model');

function addUser(user){
    const myUser = new Model(user);
    return myUser.save();
}

async function getUsers(){
    return await Model.find();
}

module.exports = {
    add: addUser,
    getAll: getUsers,
}