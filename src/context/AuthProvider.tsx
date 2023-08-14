import { createContext, useEffect, useState } from 'react';
import { AuthProviderProps } from './interfaces/AuthProviderProps';
import { AuthProviderType } from './interfaces/AuthProviderType';
import { UserInfo } from './interfaces/UserInfo';

const AuthProvider = createContext<AuthProviderType>({} as AuthProviderType);

function AuthProviderComponent(props: AuthProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({ user: {}, token: '' });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userInfo');
    const parsedLoggedInUser: UserInfo = JSON.parse(loggedInUser || `""`);

    if (parsedLoggedInUser) {
      setUserInfo({ ...parsedLoggedInUser });
    }
  }, []);

  return (
    <AuthProvider.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </AuthProvider.Provider>
  );
}

export { AuthProvider, AuthProviderComponent };
