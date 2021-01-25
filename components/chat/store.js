const Model = require('./model');

function addNewChat(userList){
    const myChat = new Model(userList);
    return myChat.save();
}

async function getChats(){
    return new Promise((resolve, reject) => {
        const chats = Model.find()
        .populate('chat')
        .populate('users')            
        .exec((error, populated) => {
            if(error){
                reject(error);
                return false;
            }
            resolve(populated);
        }); 
    });
}

module.exports = {
    createChat : addNewChat,
    getChats: getChats,
}