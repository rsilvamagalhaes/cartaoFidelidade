/**
 * run project $ npm run dev  
 */

const mongoose = require("mongoose");
const express = require("express");
const BodyParser = require("body-parser");
const cors = require('cors');

const requireDir = require("require-dir");

const CONNECTION_URL = "mongodb+srv://dbFidelidade:HQPTVWan32zH6Jy@cluster0-fnldm.mongodb.net/dbFidelidade?retryWrites=true";
const DATABASE_NAME = "dbFidelidade";

var app = express(); 
app.use(express.json());
app.use(cors());

mongoose.connect(CONNECTION_URL + "/" + DATABASE_NAME, { useNewUrlParser: true , useUnifiedTopology: true}, (error, client) => {
    if(error) {
        throw error;
    }
    console.log("Connected to `" + DATABASE_NAME + "`!");
});

requireDir('./src/models');

app.listen(3001);
app.use('/api', require("./src/routes"))