const mongoose = require('mongoose');


function ConnectToDb(){
    mongoose.connect(process.env.DB_CONNECT,
    ).then(() =>{
         console.log('Connected to DB');
    }).catch(err => console.log(err));
}
console.log('Connected to DB');
module.exports = ConnectToDb;