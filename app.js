const mongoose = require("mongoose");
const express = require("express");
const BodyParser = require("body-parser");

const requireDir = require("require-dir");

const CONNECTION_URL = "mongodb+srv://dbFidelidade:HQPTVWan32zH6Jy@cluster0-fnldm.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "dbFidelidade";

var app = express(); 
app.use(express.json());

mongoose.connect(CONNECTION_URL + "/" + DATABASE_NAME, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    console.log("Connected to `" + DATABASE_NAME + "`!");
});

requireDir('./src/models');

app.listen(3000);
app.use('/api', require("./src/routes"))