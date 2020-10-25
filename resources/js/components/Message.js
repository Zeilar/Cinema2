import React, { useState, useEffect } from 'react';
import { mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';

export default function Message({ id, content, user, created_at, deletable, deleteMessage }) {
    const date = new Date(created_at);
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
    const parsedTime = `${hours}:${minutes}`;

    const [fragments, setFragments] = useState([]);
    const [mention, setMention] = useState(false);

    useEffect(() => {
        setFragments(content.split(' '));
    }, [content]);

    useEffect(() => {
        for (let i = 0; i < fragments.length; i++) {
            if (fragments[i] === `@${user.username}`) {
                setMention(true);
                break;
            }
        }
    }, [fragments]);

    return (
        <div className={`message p-2 row wrap relative ${mention ? 'mention' : ''}`} key={id}>
            <time className="messageTime mr-1">
                {parsedTime}
            </time>
            <span className="messageAuthor bold mr-1" style={{ color: user.color.value }}>
                {user.username}:
            </span>
            <p className="messageContent">
                {fragments.map(fragment => <span className="messageFragment" key={Math.random()}>{fragment} </span>) /* important whitespace */}
            </p>
            {
                deletable &&
                    <button className="btn messageDelete d-none absolute" onClick={() => deleteMessage(id)}>
                        <Icon path={mdiTrashCan} />
                    </button>
            }
        </div>
    );
}