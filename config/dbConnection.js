const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database connection established", connect.connection.name, connect.connection.host, connect.connection.port)
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}
module.exports = connectDB;