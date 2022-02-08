const defaultState = {
  id: null,
  email: '',
  username: '',
  compressedImage: '',
  isActivated: '',
  isAuth: null,
};

const userReducer = (state = defaultState, {type, payload}) => {
  switch (type) {
    case 'LOGOUT':
      return defaultState
    case 'CHANGE_USER':
      return {...state, ...payload, isAuth: true}
    default:
      return state;
  }

}

export default userReducer;

