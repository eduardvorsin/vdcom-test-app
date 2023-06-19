import React from 'react';
import { Provider } from 'react-redux';
import { PreloadedState } from '@reduxjs/toolkit';
import { RootState, setupStore } from '../../store/store';

const wrapWithRedux = (component: React.ReactElement, initialState: PreloadedState<RootState>):
  ReturnType<typeof Provider> => {
  const store = setupStore(initialState);

  return (
    <Provider store={store} >
      {component}
    </Provider>
  );
};

export default wrapWithRedux;
