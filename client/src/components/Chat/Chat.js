import React, { useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import Infobar from '../Infobar/Infobar';
import Input from '../Input/Input';

let socket;

const Chat = ({location}) =>{

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const ENDPOINT = 'localhost:3001';

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        console.log(socket);

        socket.emit('join', {name, room}, (error)=>{
            console.log(error);
        });

        return () =>{
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }

    console.log(messages);

    return(
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room}/>

                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;