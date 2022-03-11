const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path=require('path');
mongoose.connect("mongodb+srv://pwr:mGHtMLPW8ByACXmK@cluster0.pb8zt.mongodb.net/todolist-mean?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected sucesssfully")
    })
    .catch((err) => {
        console.log("problem in connecting", err.message, err);
    })
const app = express();

const port = process.env.PORT || 3000;
app.set('port', port)
app.use("/images",express.static(path.join('images')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
})

const server = http.Server(app);
server.on('error', (err) => {
    console.log("error  in server", err.message, err);
})
server.on('listening', () => {
    console.log("hi im listening on port:", port)
})

let tasks=require('./routes/tasks/');
let users=require('./routes/users/');
app.use('/api/tasks/',tasks);
app.use('/api/users/',users);

server.listen(port);
