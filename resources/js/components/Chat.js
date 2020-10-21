import React, { useState, useRef, useEffect } from 'react';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

export default function Chat() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState();

    const render = () => {
        return (
            'chat'
        );
    }

    useEffect(() => {
        window.Echo.join('chat')
            .here(users => {
                setLoading(false);
                setUsers(users?.map(obj => obj.user.username));
            });
    }, [setLoading]);

    return (
        <div className="chat relative w-25">
            {loading ? <Icon className="loading center-self" path={mdiLoading} spin={1} /> : render()}
        </div>
    );
}