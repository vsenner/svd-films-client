const defaultState = {
    genres: []
};

const moviesReducer = (state = defaultState, {type, payload}) => {
    switch (type) {
        case 'CHANGE_GENRES':
            return {...state, genres: payload}
        default:
            return state;
    }

}

export default moviesReducer;

