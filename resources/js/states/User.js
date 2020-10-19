function addUser() {
    return {
        type: 'addUser',
    };
}

function removeUser() {
    return {
        type: 'removeUser',
    };
}

function userReducer(state = false, action) {
    switch (action.type) {
        case 'addUser':
            return state = true;
        case 'removeUser':
            return state = false;
        default:
            return state;
    }
}

export {
    addUser,
    removeUser,
    userReducer,
};
