const {users} = require('./users.json')

function login(input){
    const user = users.find(user => {return user.email === input.email && user.password === input.password})
    if(user){
        return user.firstName
    } 
    else{
        return false
    }
}

module.exports = login