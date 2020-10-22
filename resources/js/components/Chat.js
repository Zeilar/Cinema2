import React, { useState, useRef, useEffect } from 'react';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

export default function Chat() {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState();
    const [users, setUsers] = useState();
    const input = useRef();

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
        if (e.key !== 'Enter' || input.current.value === '') return;

        const formData = new FormData();
        formData.append('content', input.current.value);

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
        window.Echo.join('chat')
            .here(users => {
                setLoading(false);
                if (users == null) setUsers(users?.map(obj => obj.user.username));
            })
            .listen('NewMessage', e => console.log(e));
        if (messages == null) getMessages();
    }, [setLoading, messages, getMessages]);

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
                <div className="messagesWrapper flex col">
                    {messages?.map(message => messageRender(message))}
                </div>
                <div className="chatInput p-2 mt-2">
                    <input className="border-0 w-100" placeholder="Aa" ref={input} onKeyDown={chatSend} />
                </div>
            </>
        );
    }

    return (
        <div className="chat relative w-25 col">
            {loading ? <Icon className="loading center-self" path={mdiLoading} spin={1} /> : render()}
        </div>
    );
}