import React, { useState } from 'react';
import { mdiLoading } from '@mdi/js';
import Http from '../classes/Http';
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

        const result = await Http.post('users', { body: formData });
        setLoading(false);
        if (result.user) {
            setUsernameError(false);
            setUser(result.user);
        } else if (result.errors) {
            setUsernameError(result.errors.username[0]);
        } else {
            setUsernameError('Something went wrong!');
        }
    }

    return (
        <div className="newUser center-self center-children col">
            <h1 className="newUserHeader">
                Welcome to Cinema! Enter a name you wish to use.
            </h1>

            {usernameError && <p className="formError mt-3">{usernameError}</p>}
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