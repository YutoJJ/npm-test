
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/test').then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.port);

}, err => {
  console.log('Connection to db failed: ' + err);
});

app.get('/', (req, res) => {
    res.send(`Hello`);

});
/*
app.get('/path1/:param1', (req, res) => {
    param = req.params.param1;
    res.send(`Hello ${param}`);

});
app.get(['/path2', '/path3'], (req, res) => {
    param = req.hostname;
    res.send(`Hello ${param}`);

});

app.get('/path4|/path5/g', (req, res) => {
    param = req.hostname;
    res.send(`Hello ${param}`);

});
*/
app.listen(3000);