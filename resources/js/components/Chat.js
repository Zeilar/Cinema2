import React, { useState, useRef, useEffect } from 'react';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

export default function Chat() {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState();
    const [channel, setChannel] = useState();
    const [users, setUsers] = useState();
    const chatbox = useRef();
    const input = useRef();

    async function getMessages() {
        return await fetch(`${location.origin}/api/messages`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(messages => setMessages(messages.reverse()));
    }

    async function chatSend(e) {
        if (e.key !== 'Enter' || input.current.value === '') return;

        const formData = new FormData();
        formData.append('content', input.current.value);
        input.current.value = '';

        const args = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.querySelector('[name=csrf-token]').getAttribute('content'),
            },
            body: formData,
        };

        await fetch(`${location.origin}/api/messages`, args);
    }

    function addMessage(existingMessages, messageToAdd) {
        if (existingMessages?.length >= 30) {
            console.log(existingMessages);
            existingMessages = existingMessages.filter(message => message !== existingMessages[0]);
            console.log(existingMessages);
            existingMessages.push(messageToAdd);
            console.log(existingMessages);
            setMessages(existingMessages);
        } else {
            setMessages(p => [...p, message]);
        }
    }

    useEffect(() => {
        if (messages == null) getMessages();
        if (channel == null) {
            const channel = window.Echo.join('chat')
                .here(users => {
                    setLoading(false);
                    if (users == null) setUsers(users?.map(obj => obj.user.username));
                })
                .listen('NewMessage', ({ messages }) => setMessages(messages.reverse()));
            setChannel(channel);
        }
        chatbox.current?.scrollTo(0, 9999);
    }, [setLoading, messages, channel, setChannel, getMessages, chatbox]);

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
                <div className="messagesWrapper overflow-auto flex col" ref={chatbox}>
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
