const express = require('express');
const post__ = require('./Routes/files');
const path = require('path');
const get__ = require('./Routes/get');
const down__ = require('./Routes/download');
const cors = require('cors');
require('dotenv').config();


// express connection
const app = express();

// DB Connection
const connectDB = require('./configs/db');

// port no 
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
// connect DB
connectDB();

// cors

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions));


/*C:\Users\PUNIT KUMAR OJHA\Desktop\web_dev\JS\fileshare\server.js*/

//Set Template Engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routing
app.use('/api/files', post__);

app.use('/files', get__);

app.use('/files/download', down__);

app.listen(PORT, ()=>{
    console.log("listening on port Number", PORT);
});