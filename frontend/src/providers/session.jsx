import { createContext, useContext, useEffect, useState } from "react";
import useApi from "../hooks/use-api";
import { apiGetSession, apiLoginAccount } from "../apis/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const SessionContext = createContext({
  loading: false,
  user: null,
  login: async (data) => {},
  logout: () => {},
});

const SessionProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, SetUser] = useState();
  const { fn: apiLoginRequest, loading: lLoading } = useApi(apiLoginAccount, {
    success: true,
  });

  const { fn, loading, data } = useApi(apiGetSession, { success: true });

  const getSession = async () => {
    const token = Cookie.get("token");

    if (token) {
      await fn();
    }
  };

  useEffect(() => {
    SetUser(data);
  }, [data]);

  useEffect(() => {
    getSession();
  }, []);

  const login = async (data) => {
    const res = await apiLoginRequest(data);
    if (res.success) {
      SetUser(res.data);
      Cookies.set("token", res.token, {
        expires: 30,
      });
      navigate("/dashboard");
    }
    return res;
  };

  const logout = () => {
    SetUser(null);
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <SessionContext.Provider
      value={{ user, loading: loading || lLoading, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

export default SessionProvider;
