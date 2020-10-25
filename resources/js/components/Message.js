import { mdiTrashCan } from '@mdi/js';
import React from 'react';
import Icon from '@mdi/react';

export default function Message({ id, content, user, created_at, deletable, deleteMessage }) {
    const date = new Date(created_at);
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
    const parsedTime = `${hours}:${minutes}`;

    return (
        <div className="message p-2 row wrap relative" key={id}>
            <time className="messageTime mr-1">
                {parsedTime}
            </time>
            <span className="messageAuthor bold mr-1" style={{ color: user.color.value }}>
                {user.username}:
            </span>
            <p className="messageContent">
                {content}
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