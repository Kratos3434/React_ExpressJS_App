 var HTTP_PORT = process.env.PORT || 8080;
 var express = require("express");
 var path = require('path')
 var app = express();
 var service = require('./service');
 var DB = require('./database');
 app.use(express.json()) // for parsing application/json
 app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

 app.get('/api',(req,res)=>{
     DB.getUsers().then(data=>{
         res.json(data);
     }).catch(reason=>{console.log(reason)});
 })

 app.post('/api',(req,res)=>{
     const data = req.body;
     console.log('Data: ' + data);
     DB.addUser(data).then(data=>{
         res.json(data);
     });
 })
 app.post('/user',(req,res)=>{
     const data = req.body;
     service.setUser(data).then(data=>res.json(data));
 })


 app.delete('/user',(req,res)=>{
     service.deleteUser().then(msg=>{
         console.log(msg);
     })
 })
 DB.initDB().then(DB.defineUsers).then(DB.initUsers).then(app.listen(HTTP_PORT));
