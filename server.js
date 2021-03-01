const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');
const app = express();

const port = process.env.PORT ;

dotenv.config({path:'config.env'});


//log request
app.use(morgan('tiny'));

// mongoDB connection
connectDB();

//parse request to body request
app.use(bodyparser.urlencoded({extended:true}));


// set view engine
app.set("view engine","ejs");
// app.set("views",path.resolve(__dirname,"view/ejs"));

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

app.use('/',require('./server/routes/router'));

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
})
