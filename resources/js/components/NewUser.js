import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function NewUser() {
    const [usernameError, setUsernameError] = useState();
    const input = useRef();

    async function login() {
        const formData = new FormData();
        formData.append('username', input.current.value);

        const args = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-CSRF-Token': document.querySelector('[name=csrf-token]').getAttribute('content'),
            },
            body: formData,
        };
        await fetch(`${location.origin}/api/users`, args)
            .then(response => {
                if (response.status === 200 || response.status === 422) {
                    return response.json();
                }
            })
            .then(data => {
                if (data.errors) {
                    setUsernameError(data.errors.username[0]);
                }

                if (data.user) {
                    setUsernameError(false);
                    // add user
                }
            });

    }

    return (
        <div className="newUser">
            <h1 className="newUserHeader">
                Welcome to Cinema! Enter a name you wish to use.
            </h1>

            <div className="newUserForm">
                <div className="newUserFormUsername">
                    {usernameError && <p className="formError">{usernameError}</p>}
                    <input type="text" ref={input} />
                </div>
            </div>

            <button onClick={login}>
                Log in
            </button>
        </div>
    );
}