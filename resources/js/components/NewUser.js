import React, { useState } from 'react';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

export default function NewUser({ setUser }) {
    const [usernameError, setUsernameError] = useState();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    function loginSubmitHandler(e) {
        e.preventDefault();
        login();
    }

    async function login() {
        setLoading(true);

        const formData = new FormData();
        formData.append('username', input);
        

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
                setLoading(false);

                if (data.errors) {
                    setUsernameError(data.errors.username[0]);
                }

                if (data.user) {
                    setUsernameError(false);
                    setUser(true);
                }
            });

    }

    return (
        <div className="newUser center-self center-children col">
            <h1 className="newUserHeader">
                Welcome to Cinema! Enter a name you wish to use.
            </h1>

            {usernameError && <p className="formError">{usernameError}</p>}
            <form className="newUserForm mt-3 row" onSubmit={loginSubmitHandler}>
                <input className="newUserInput mr-3" onChange={(e) => setInput(e.target.value)} placeholder="John Smith" />
                {
                    !loading
                        ? <button className="newUserSubmit d-flex" onClick={login}>
                            Log in
                        </button>
                        : <button className="newUserSubmit spin" disabled>
                            <Icon path={mdiLoading} spin={1} />
                        </button>
                }
            </form>
        </div>
    );
}