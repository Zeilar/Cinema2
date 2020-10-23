import React, { useState, useRef, useEffect } from 'react';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

export default function Chat() {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState();
    const [input, setInput] = useState('');
    const [users, setUsers] = useState();
    const messagesRef = useRef();
    const chatbox = useRef();

    messagesRef.current = messages;

    async function getMessages() {
        await fetch(`${location.origin}/api/messages`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(messages => setMessages(messages));
    }

    async function chatSend(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', input);
        setInput('');

        const args = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.querySelector('[name=csrf-token]').getAttribute('content'),
            },
            body: formData,
        };

        await fetch(`${location.origin}/api/messages`, args);
    }

    useEffect(() => {
        chatbox.current?.scrollTo(0, 99999);
    });

    useEffect(() => {
        getMessages();
        window.Echo.join('chat')
            .here(users => {
                setLoading(false);
                if (users == null) setUsers(users?.map(obj => obj.user.username));
            })
            .listen('NewMessage', ({ message }) => {
                setMessages(p => {
                    let messages = p;
                    messages.shift();
                    return [...messages, message];
                });
            });
    }, []);

    const messageRender = (message) => {
        const date = new Date(message.created_at);
        const parsedTime = `${date.getHours()}:${date.getMinutes()}`;

        return (
            <div className="message p-2 row wrap" key={message.id}>
                <time className="messageTime mr-1">
                    {parsedTime}
                </time>
                <span className="messageAuthor mr-1">
                    {message.user.username}:
                </span>
                <p className="messageContent">
                    {message.content}
                </p>
            </div>
        );
    }

    const render = () => {
        return (
            <>
                <div className="messagesWrapper flex col" ref={chatbox}>
                    {messages?.map(message => messageRender(message))}
                </div>
                <form className="chatInput p-2 mt-2" onSubmit={chatSend}>
                    <input className="border-0 w-100" placeholder="Aa" value={input} onChange={(e) => setInput(e.target.value)} />
                </form>
            </>
        );
    }

    return (
        <div className="chat relative w-25 col">
            {loading ? <Icon className="loading center-self" path={mdiLoading} spin={1} /> : render()}
        </div>
    );
}