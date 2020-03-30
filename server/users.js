const users = [];

const addUser = ({id, name, room}) =>{

    const name = name.trim().toLowerCase();
    const room  = room.trim().toLowerCase();

    const existingUser = users.find((user)=> user.name === user.name && user.room === room);

    if(existingUser){
        return ({error: 'Username is taken'});
    }

    const user = {id, name, room};
    users.push(user);
}

const removeUser = (id) =>{

    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        users.splice(index,1)[0];
    }

}

const getUser = (id) =>{

    return users.find((user) => user.id === id);

}

const getUsersInRoom = (room) =>{

    return users.filter((user) => user.room === room);

}

module.exports = {addUser, removeUser, getUser, getUsersInRoom};