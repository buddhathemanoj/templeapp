const initialState = {
    user: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        console.log('SET_USER action dispatched with payload:', action.payload);
        return { ...state, user: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;