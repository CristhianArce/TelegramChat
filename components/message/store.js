const Model = require('./model');

function addMessage(fullMessage){
    const myMessage = new Model(fullMessage);
    myMessage.save();
}

async function getMessages(filterMessageByChat){
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterMessageByChat !== null){
            filter = {chat: filterMessageByChat};
        }
        const messages = Model.find(filter)
            .populate('user')
            .exec((error, populated) => {
                if(error){
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
            
    });
}

async function updateText(id, message){
    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.message = message;
    return await foundMessage.save();
}

function removeMessage(id){
    return Model.deleteOne({
        _id : id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage,
}