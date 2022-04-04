import React, { useEffect } from "react";
// router
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchUser";

const App = () => {
  // navigate = useNavigate();
  const navigate = useNavigate();
  // effect => login
  useEffect(() => {
    // user
    const user = fetchUser();

    // login url => not login user
    if (!user) navigate("/login");
  }, []);
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
