import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from './User';

export default function NewUser() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const input = useRef();

    console.log(user);

    async function login() {
        const formData = new FormData();

        formData.append('username', 'test');

        const args = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.querySelector('[name=_token]').getAttribute('content'),
            },
            body: formData,
        };
        await fetch(`${location.origin}/api/guests`, args)
            .then(response => response.json())
            .then(data => console.log(data));

        // dispatch(addUser());
    }

    return (
        <div className="newUser">
            <h1 className="newUserHeader">
                Welcome to Cinema! Enter a name you wish to use.
            </h1>

            <div className="newUserForm">
                <div className="newUserFormUsername">
                    <input type="text" ref={input} />
                </div>
            </div>

            <button onClick={login}>
                Log in
            </button>
        </div>
    );
}