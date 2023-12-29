export const setUser = (user) => {
    console.log('Action being dispatched:', { type: 'SET_USER', payload: user });
    return { type: 'SET_USER', payload: user };
  };
  