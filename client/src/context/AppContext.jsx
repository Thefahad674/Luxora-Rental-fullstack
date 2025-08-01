import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || "";

    if (
      error.response?.status === 401 &&
      !url.includes("/api/user/data") &&
      !url.includes("/api/user/cars")
    ) {
      toast.error("Not authorized");
    }

    return Promise.reject(error);
  }
);

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setreturnDate] = useState("");
  const [cars, setCars] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");

      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      if (data.success) setCars(data.cars);
    } catch (error) {
      // Silent fail
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `${savedToken}`;
      fetchUser();
    } else {
      setUser(null);
      setIsOwner(false);
      axios.defaults.headers.common["Authorization"] = "";
    }

    fetchCars();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("You have been logged out");
    navigate("/");
  };

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setreturnDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
