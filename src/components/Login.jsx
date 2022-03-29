// Login.jsx
import React from "react";
// socail login
import GoogleLogin from "react-google-login";
// router
import { useNavigate } from "react-router-dom";
// icons
import { FcGoogle } from "react-icons/fc";

// video
import WatchVideo from "../assets/apple.mp4";
// img
import logo from "../assets/eShop-logo2.png";
// client
import { client } from "../client";

const Login = () => {
  // navigate value
  const navigate = useNavigate();
  // responseGoogle value
  const responseGoogle = (response) => {
    // User info in the localbroser storage => 5 MB per App
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    // profileObj data[obj]
    const { name, imageUrl, googleId } = response.profileObj;
    // saving the user details in the sanity
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    // client Exists
    client.createIfNotExists(doc).then(() => {
      // navigate url
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {/* Login video */}
        <video
          src={WatchVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      {/* overlay effect for the video */}
      <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
        {/* Login Content */}
        {/* Logo */}
        <div className="p-5">
          <img src={logo} alt="logo" width="180px" />
        </div>
        {/* Login button[Google] */}
        <div className="shadow-2xl">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_TOKEN}
            render={(renderProps) => (
              <button
                type="button"
                className="bg-mainColor flex justify center items-center p-2 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4" /> Sign in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
