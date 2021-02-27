
const express = require('express');
const app = express();
const Route = require('./routers')
const path = require("path")


// const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true })) // to parse the data

app.use(express.json()) // to make the content header     application/json


app.use(express.static(__dirname + "/public"));


// mongodb + srv://belalabuhai:belal123456@cluster0.ykmjv.mongodb.net/tweeter?retryWrites=true&w=majority

// mongoose.connect("mongodb+srv://belalabuhai:belal123456@cluster0.ykmjv.mongodb.net/pokes?retryWrites=true&w=majority",
//     {
//         useNewUrlParser: true, useUnifiedTopology: true,
//         useCreateIndex: true, useFindAndModify: false
//     })

//     .then(() => console.log('MongoDB Connected correctly ...'))
//     .catch(err => console.log(err));


// app.get('/test', (req, res) => {
//     res.send("test")
// })


app.use('/', Route);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listening on ${port}`)
})