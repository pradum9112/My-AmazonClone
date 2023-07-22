require("dotenv").config();
const path = require('path');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");

const Products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);


//deployment code start

app.use(express.static(path.join(__dirname,'./client/build')));
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//deployment code end

const port = 8005;

app.listen(port,()=>{
    console.log(`Server is runing on port number ${port}`);
});

DefaultData();