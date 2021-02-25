const mongoose = require('mongoose');
require('dotenv').config();

function connectDB(){
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true}).then(()=>{
        console.log("\n\nDB connected....\n\n")
    }).catch(err=>console.log("Error connecting DB \n", err));
}

module.exports = connectDB;