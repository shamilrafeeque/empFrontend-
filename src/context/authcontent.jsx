import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { login } from "../apis/api";

const AuthContext = createContext();

const url = 'http://localhost:8001/employee' ;
export default AuthContext;

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null
  );
  const [user, setUser] = useState({});

  

  const postloginData = async (email, password) => {
    console.log(email, password);
    try {
        const response = await login(email, password);
        if (response.data.access_token) {
            const tokens = {
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh,
            };
            // Store tokens in localStorage
            localStorage.setItem("access_token", JSON.stringify(tokens));
            setAuthTokens(tokens);
            setUser(jwtDecode(response.data.access_token));
        }

        const decodedToken = jwtDecode(response.data.access_token);
        console.log(decodedToken);
        if (decodedToken.is_staff) {
            window.location.href = "/dashboard/";
        } else {
            window.location.href = "/employee/";
        }
    } catch (error) {
        console.log(error, " error on postloginData function");
        throw error;
    }
};



  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("access_token");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    postloginData,
    logoutUser,

  };
  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.accessToken));
    }
    const decodedJwt = user;
    try {
      if (decodedJwt.ext * 1000 < Date.now()) {
        console.log("logout is called");
        logoutUser();
      }
    } catch {
      console.log("");
    }
    setLoading(false);
  }, [authTokens]);

  // automatic logout when token expires
  useEffect(() => {
    const currTimeStamp = new Date(new Date());
    const expTimeStamp = new Date(user?.exp * 1000); 
    if (currTimeStamp > expTimeStamp) {
      logoutUser();
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
