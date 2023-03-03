
var user;


function setUser(currentUser){
    return new Promise((resolve,reject)=>{
        user = currentUser.user;
        resolve(user);
    })
}

function deleteUser(){
    return new Promise((resolve,reject)=>{
        user = undefined;
        resolve('User logged out');
    })
}

module.exports = {
    setUser,
    deleteUser
}

//Set the logged in user her in the server
