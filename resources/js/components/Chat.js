import React, { useState, useRef, useEffect, useCallback } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import Http from '../classes/Http.js';
import { mdiLoading, mdiPhoneReturnOutline } from '@mdi/js';
import Message from './Message';
import Icon from '@mdi/react';

export default function Chat({ user }) {
    const [userColor, setUserColor] = useState(user.color);
    const [colorPicker, setColorPicker] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [colors, setColors] = useState([]);
    const [emotes, setEmotes] = useState([]);
    const [input, setInput] = useState('');
    const [users, setUsers] = useState([]);
    const messagesRef = useRef();
    const chatbox = useRef();

    messagesRef.current = messages;

    const clickOutsideColorPicker = useOnclickOutside(() => {
        setColorPicker(false);
    });

    function autoComplete(e) {
        if (input === '' || e.key !== 'Tab') {
            return setMatches([]);
        }
        e.preventDefault();

        const fragments = input.split(' ');
        if (matches.length > 0) {
            fragments[fragments.length - 1] = matches.length > 1 ? matches[1].name : matches[0].name;

            setMatches(p => {
                const removed = p.shift();
                return [...p, removed];
            });
        } else {
            const localMatches = [];
            for (let i = 0; i < emotes.length; i++) {
                if (emotes[i].name.toLowerCase().startsWith(fragments[fragments.length - 1].toLowerCase())) {
                    setMatches(p => [...p, emotes[i]].sort((a, b) => a.name.length - b.name.length || a.name.localeCompare(b.name)));
                    localMatches.push(emotes[i]);
                }
            }
            localMatches.sort((a, b) => a.name.length - b.name.length || a.name.localeCompare(b.name));
            if (localMatches.length > 0) fragments[fragments.length - 1] = localMatches[0].name;
        }
        setInput(fragments.join(' '));
    }

    async function getMessages() {
        setMessages(await Http.get('messages'));
    }

    async function getColors() {
        setColors(await Http.get('colors'));
    }

    async function getEmotes() {
        setEmotes(await Http.get('emotes'));
    }

    async function chatSend(e) {
        e.preventDefault();

        if (input === '') return;

        const formData = new FormData();
        formData.append('content', input);

        chatbox.current?.scrollTo(0, 99999);
        setInput('');

        Http.post('messages', { body: formData });
    }

    async function changeColor(color) {
        if (color.value === userColor.value) return;

        const formData = new FormData();
        formData.append('color', color.id);

        const result = await Http.put(`users/${user.id}/color`, { body: JSON.stringify(color.id) });
        if (result) setUserColor(color);
    }

    useEffect(() => {
        chatbox.current?.scrollTo(0, 99999);
    }, [chatbox.current, messages]);

    useEffect(() => {
        getMessages();
        getEmotes();
        getColors();
        window.Echo.join('chat')
            .here(users => {
                setUsers(users.map(({ user }) => user));
                setLoading(false);
            })
            .listen('NewMessage', async ({ message }) => {
                const chatMax = await Http.get('messages/chatmax') || 50;
                setMessages(p => {
                    const messages = p;
                    if (messages?.length >= chatMax) messages.shift();
                    return [...messages, message];
                });
            })
            .listen('RemoveMessage', ({ message }) => setMessages(p => p.filter(element => element.id !== message.id)));
    }, []);

    const deleteMessage = useCallback(id => {
        Http.delete(`messages/${id}`);
    }, []);

    const render = () => {
        return (
            <>
                <div className="messagesWrapper flex col" ref={chatbox}>
                    {
                        messages.map(message => (
                            <Message
                                deletable={message.user.id === user.id}
                                created_at={message.created_at} 
                                deleteMessage={deleteMessage}
                                content={message.content}
                                user={message.user}
                                key={message.id}
                                emotes={emotes}
                                id={message.id}
                            />
                        ))
                    }
                </div>
                <div className="chatControls p-2 mt-2 col">
                    <form className="chatSendForm" onSubmit={chatSend}>
                        <input className="chatInput w-100" placeholder="Aa" value={input} onKeyDown={autoComplete} onChange={(e) => setInput(e.target.value)} />
                    </form>

                    <div className="chatButtons row mt-2">
                        <div className="chatButton relative" ref={clickOutsideColorPicker}>
                            {
                                colorPicker &&
                                    <div className="colorPicker rounded absolute p-2">
                                        {
                                            colors.map(color => (
                                                <button
                                                    className={`btn colorPickerItem w-fit m-1 ${color.value === userColor.value ? 'active' : ''}`} 
                                                    style={{ backgroundColor: color.value }} key={color.id} onClick={() => changeColor(color)}
                                                ></button>
                                            ))
                                        }
                                    </div>
                            }
                            <button className="btn bold" style={{ color: userColor.value }} onClick={() => setColorPicker(p => !p)}>
                                {user.username}
                            </button>
                        </div>

                        <button className="btn chatSubmit ml-auto pl-2 pr-2" onClick={chatSend}>
                            Send
                        </button>
                    </div>
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
