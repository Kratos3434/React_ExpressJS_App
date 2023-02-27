var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require('path')
var app = express();
var service = require('./service');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/api',(req,res)=>{
    service.getUsers().then(data=>{
        res.json(data);
    }).catch(reason=>{console.log(reason)});
})

app.post('/api',(req,res)=>{
    const data = req.body;
    service.addUser(data).then(data=>{
        res.json(data);
    }).then(service.persistUser);
})
app.post('/user',(req,res)=>{
    const data = req.body;
    service.setUser(data).then(msg=>console.log(msg));
})

app.get('/user',(req,res)=>{
    service.getUser().then(data=>{
        res.json(data);
    });
})

app.delete('/user',(req,res)=>{
    service.deleteUser().then(msg=>{
        console.log(msg);
    })
})
service.loadUsers().then(app.listen(HTTP_PORT));