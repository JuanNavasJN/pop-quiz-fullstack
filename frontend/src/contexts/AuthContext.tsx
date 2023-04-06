import {
  FC,
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { LoginParams, User, IAuthContext } from "./AuthContext.types";
import {
  register,
  login as fetchLogin,
  forgotPassword,
  resetPassword,
  getMe,
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
  logout: () => {},
});

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const AT = localStorage.getItem("AT");

    if (AT) {
      getMe(AT).then((user) => {
        setUser(user);
      });
    }
  }, []);

  const login = useCallback(async (params: LoginParams) => {
    const res = await fetchLogin(params);

    if (res) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem("AT", res.token); // Access Token
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("AT");
    setUser(null);
  }, []);

  const context = {
    register,
    login,
    forgotPassword,
    resetPassword,
    user,
    token,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
