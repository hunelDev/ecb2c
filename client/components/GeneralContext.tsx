import React, { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { api } from '../utils/general';

export const GeneralContext = React.createContext({});

const General: FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token && !user)
      api.get('/user-check').then(({ data }) => setUser(data.name));
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default General;
