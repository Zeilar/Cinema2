function setVideoId() {
    return {
        type: 'setVideoId',
    };
}

function videoIdReducer(state = 'dQw4w9WgXcQ', action) {
    switch (action.type) {
        case 'setVideoId':
            return state;
        default:
            return state;
    }
}

export {
    setVideoId,
    videoIdReducer,
};
