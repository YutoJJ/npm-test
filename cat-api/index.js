'use strict';

require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Schema = mongoose.Schema;


const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

/*
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  dateOfBirth: Date,

});
const user = mongoose.model('User',userSchema);
*/

const catSchema = new Schema({
  name: String,
  age: {
    type: Number,
    min: 0
  },
  gender:{
    "enum": ["male", "female"],
    type: String
  },
  color:String,
  weight:Number

});

const cat = mongoose.model('Cat',catSchema);

////

mongoose.connect('mongodb://localhost:27017/test' , {useNewUrlParser: true}).then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});

app.post('/cats',(req,res)=>{
  console.log('data from http post',req.body);
  cat.create({
      name:req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      color: req.body.color,
      weight: req.body.weight
  }).then(c => {
      res.send(`cat ${c.name} created with id: ${c._id}`);

  });
});


app.get('/cats',(req,res)=>{
  const {gender , age , weight} = req.query;
  let find = cat.find();

  if(gender != undefined) {
    find = find.where('gender').equals(gender);
  }
  if(age != undefined){
    find = find.where('age').gte(age);
  }
  if(weight != undefined){
    find = find.where('gender').gte(weight);
  }
 
  find.then(f => {
    res.send(f);
  });
});

/*

app.post('/user',(req,res)=>{

    console.log('data from http post',req.body);
    user.create({
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        dateOfBirth: new Date(req.body.dob).getTime()
    }).then(usr => {
        res.send(`user ${usr.firstname} created with id: ${usr._id}`);

    });
});

app.get('/user',(req,res)=>{
    user.find().then(usrs=>{
        res.send(usrs);
    });
});
*/
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/test', (req, res) => {
    res.send('Testing is fun');
});

app.post('/user',(req, res)=>{
  console.log('data from ...',req.body);
  res.send();

});

//app.listen(process.env.PORT);



