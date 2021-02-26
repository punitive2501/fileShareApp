require('dotenv').config();
const express = require('express');
const post__ = require('./Routes/files');
const path = require('path');
const get__ = require('./Routes/get');
const down__ = require('./Routes/download');
const cors = require('cors');
const cron = require('node-cron');
const connectDB = require('./configs/db');
const File = require('./Model/file');
const fs = require('fs');

// express connection
const app = express();
app.use(cors());

// port no 
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
// connect DB
connectDB();

// cors
//Set Template Engine
app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'ejs');

// Routing
app.use('/api/files', post__);

app.use('/files', get__);

app.use('/files/download', down__);

cron.schedule('* * * * *', async function() {
    connectDB();
    // Get all records older than 24 hours 
    const files = await File.find({ createdAt : { $lt: new Date(Date.now() - 1)} });
    
    if(files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`successfully deleted ${file.filename}`);
            }catch(err){
                console.log(`error while deleting file ${err} `);
            }
        }
    }
    console.log('Job done!');
});


app.listen(PORT, ()=>{
    console.log("listening on port Number", PORT);
});