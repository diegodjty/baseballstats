import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const { Provider } = AppContext;

export const AppProvider = (props) => {
  const [season, setSeason] = useState('season2022');

  return <Provider value={[season, setSeason]}>{props.children}</Provider>;
};
