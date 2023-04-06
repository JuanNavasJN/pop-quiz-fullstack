import { FC, createContext, useState, ReactNode } from "react";
import { LoginParams, User, IAuthContext } from "./AuthContext.types";
import {
  register,
  login as fetchLogin,
  forgotPassword,
  resetPassword,
} from "./AuthRequests";

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  register: () => new Promise(() => {}),
  login: () => new Promise(() => {}),
  forgotPassword: () => new Promise(() => {}),
  resetPassword: () => new Promise(() => {}),
  user: null,
  token: null,
});

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (params: LoginParams) => {
    const res = await fetchLogin(params);

    if (res) {
      setUser(res.user);
      setToken(res.token);
    }
  };

  const context = {
    register,
    login,
    forgotPassword,
    resetPassword,
    user,
    token,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
