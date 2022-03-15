import UserController from "../../controllers/user-controller";

const BASE64 = 'data:image/jpg;base64'
const placeholderURL = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=';

export const imageHandler = async (image, setImage, user_id, dispatch) => {
  if (image?.files.length) {
    if (image.files[0].size > 2000000) {
      throw new Error('Photo must be smaller than 2MB.');
    }

    await UserController.changeUserImage(image.files[0], user_id);
    UserController.getUserImage(user_id).then(img => {
      setImage(img ? `${BASE64}, ${img}` : placeholderURL);
      dispatch({type: 'CHANGE_USER', payload: {compressedImage: img}});
      image.value = null;
    })
  }
}

export const nicknameHandler = async (usernameInput, user, setUser, user_id) => {
  if (usernameInput !== user.username) {
    await UserController.changeUsername(usernameInput, user_id);
    setUser(prev => ({...prev, username: usernameInput}));
  }
}

