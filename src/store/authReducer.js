const defaultState = {
  isAuth: false,
  user: {},
  isLoading: false
};

const authReducer = (state = defaultState, {type, payload}) => {
  switch (type) {
    case 'CHANGE_AUTH':
      return {...state, isAuth: payload}
    case 'CHANGE_USER':
      return {...state, user: payload}
    case 'CHANGE_LOADING':
      return {...state, isLoading: payload}
    default:
      return state;
  }
}

export default authReducer;

