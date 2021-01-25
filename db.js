const db = require('mongoose');
db.Promise = global.Promise;
const URL = 'mongodb://localhost:27017/telegrom-improve';

async function connect(url){
    await db.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('[db] Conectada con éxito!');
}

module.exports = {
    connect,
}

