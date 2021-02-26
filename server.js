require('dotenv').config();
const express = require('express');
const post__ = require('./Routes/files');
const path = require('path');
const get__ = require('./Routes/get');
const down__ = require('./Routes/download');
const cors = require('cors');
const connectDB = require('./configs/db');

// express connection
const app = express();

corsOptions = {
    origin: ["http://localhost:3000" , "http://localhost:5000" , "http://localhost:3300"]
}

app.use(cors(corsOptions));

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

app.listen(PORT, ()=>{
    console.log("listening on port Number", PORT);
});