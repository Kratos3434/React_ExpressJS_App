var fs = require('fs');

var users = [];
var user;
function loadUsers(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./data/users.json','utf8',(err,data)=>{
            if(err) reject('Unable to read file');
            users = JSON.parse(data);
            resolve(users);
        })
    })
}

function getUsers(){
    return new Promise((resolve,reject)=>{
        if(users.length === 0) reject('No users');
        resolve(users);
    })
}

function setUser(currentUser){
    return new Promise((resolve,reject)=>{
        if(currentUser === undefined) reject();
        user = currentUser.user;
        resolve('User set');
    })
}

function getUser(){
    return new Promise((resolve,reject)=>{
        resolve(user);
    })
}

function addUser(newUser){
    return new Promise((resolve,reject)=>{
        friend = {};
        friend.fName = users[0].fName;
        friend.lName = users[0].lName;
        friend.username = users[0].username;
        newUser.friends = [];
        newUser.friends.push(friend);
        users.push(newUser);
        resolve(users);
    })
}

function persistUser(){
    return new Promise((resolve,reject)=>{
        fs.writeFile('./data/users.json',JSON.stringify(users,null,2),(err)=>{
            if(err) reject('Unable to write to file')
            resolve('Success');
        })
    })
}

function deleteUser(){
    return new Promise((resolve,reject)=>{
        user = undefined;
        resolve('User logged out');
    })
}
module.exports = {
    loadUsers,
    getUsers,
    setUser,
    getUser,
    addUser,
    persistUser,
    deleteUser
}

//Set the logged in user her in the server