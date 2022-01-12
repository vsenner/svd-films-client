const defaultState = {
  isAuth: false,
  user: {}
};

const authReducer = (state = defaultState, {type, payload}) => {
  switch (type) {
    case 'CHANGE_AUTH':
      return {...state, isAuth: payload}
    case 'CHANGE_USER':
      return {...state, user: payload}
    default:
      return state;
  }
}

export default authReducer;

