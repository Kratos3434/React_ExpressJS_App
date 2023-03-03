const Sequelize = require('sequelize');

var sequelize;
var users = [];
var Users;
function initDB(){
    return new Promise((resolve,reject)=>{
        sequelize = new Sequelize('rvrwcfhm', 'rvrwcfhm', '1Z3dJqI1do41uqmalbeaBHie8jvO42wH', {
            host: 'batyr.db.elephantsql.com',
            dialect: 'postgres',
            port: 5432,
            dialectOptions: {
                ssl: { rejectUnauthorized: false }
            },
            query: { raw: true }
        });
        resolve('Database initialized');
    })
}

function defineUsers(){
    return new Promise((resolve,reject)=>{
        Users = sequelize.define('Users',{
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true, // use "project_id" as a primary key
                autoIncrement: true // automatically increment the value
            },
            fName: Sequelize.STRING,
            lName: Sequelize.STRING,
            username: Sequelize.STRING,
            password: Sequelize.STRING
        },{
            createdAt: false, // disable createdAt
            updatedAt: false // disable updatedAt
        })
        resolve('Users defined');
    })
}

function initUsers(){
    return new Promise((resolve,reject)=>{
        Users.findAll({
            attributes: ['fName','lName','username','password']
        }).then(data=>{
            data.map((e)=>{
                users.push(e);
            })
            resolve('Users initialized');
        })
    })
}

function getUsers(){
    return new Promise((resolve,reject)=>{
        resolve(users);
    })
}
function addUser(newUser){
    return new Promise((resolve,reject)=>{
        sequelize.sync().then(function () {
            Users.create({
                fName: newUser.fName,
                lName: newUser.lName,
                username: newUser.username,
                password: newUser.password
            }).then(function (Users) {
                // you can now access the newly created Project via the variable project
                console.log("success!")
                users.push(newUser);
                resolve(users);
            }).catch(function (error) {
                console.log("something went wrong!");
                reject('Something went wrong');
            });
        });
    })
}
module.exports = {
    initDB,
    defineUsers,
    initUsers,
    getUsers,
    addUser

}
