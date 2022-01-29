import React, { FC, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { getCookie } from '../utils/general';

export const GeneralContext = React.createContext({});

const General: FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if ((getCookie('token') && !user) || (!getCookie('token') && user)) {
      api()
        .get('/user-check')
        .then(({ data }) => setUser(data.result));
    }
  }, [getCookie('token')]);

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
