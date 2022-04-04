// UserProfile.jsx
import React, { useState, useEffect } from "react";
// react-icons
import { AiOutlineLogout } from "react-icons/ai";
// router
import { useParams, useNavigate } from "react-router-dom";
// google logout
import { GoogleLogout } from "react-google-login";
// user Query
import {
  userSavedPinsQuery,
  userQuery,
  userCreatedPinsQuery,
} from "../utils/data";
// client
import { client } from "../client";
// layout
import MasonryLayout from "./MasonryLayout";
// loading
import Spinner from "./Spinner";

// random banner image api
const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

// styles
const activeBtnStyle =
  "bg-gray-400 text-white font-bold p-2 rounded-lg shadow-lg w-20 hover:bg-gray-500 outline-none";
const notActiveBtnStyle =
  "bg-primary text-black mr-4 font-bold p-2 rounded-lg w-20 outline-none";

const UserProfile = () => {
  // use State
  // user
  const [user, setUser] = useState(null);
  // pins
  const [pins, setPins] = useState(null);
  // text
  const [text, setText] = useState("created");
  // active button
  const [activeBtn, setActiveBtn] = useState("created");
  // navigate
  const navigate = useNavigate();
  // userId
  const { userId } = useParams();

  // useEffect
  useEffect(() => {
    // query value => userId
    const query = userQuery(userId);
    // query request => user data
    client.fetch(query).then((data) => {
      // save user data
      setUser(data[0]);
    });
  }, [text, userId]);

  // reated effect
  useEffect(() => {
    // created
    if (text === "created") {
      // createdPinsQuery => userId
      const createdPinsQuery = userCreatedPinsQuery(userId);
      // clinet => pins
      client.fetch(createdPinsQuery).then((data) => {
        // setPins data
        setPins(data);
      });
    }

    // saved
    if (text === "saved") {
      // savePinsQuery => userId
      const savedPinsQuery = userSavedPinsQuery(userId);
      // client => saved Pins
      client.fetch(savedPinsQuery).then((data) => {
        // setPins data
        setPins(data);
      });
    }
  }, [text, userId]);

  // logout event handler
  const logout = () => {
    // user data out
    localStorage.clear();
    // navigate => "login"
    navigate("/login");
  };

  // but not user? return loading
  if (!user) {
    return <Spinner msg={"Loading user details!"} />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relativ flex flex-col mb-7">
          {/* Banner with user details */}
          <div className="flex flex-col justify-center items-center">
            {/* banner image */}
            <img
              src={randomImage}
              alt="banner"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover rounded-lg"
            />
            {/* user image */}
            <img
              src={user.image}
              className="w-20 h-20 rounded-full shadow-2xl object-cover -mt-10"
              alt="userImage"
            />
            {/* user name */}
            <h1 className="font-bold text-3xl text-center mt-4">
              {user.userName}
            </h1>
            {/* Logout Button */}
            <div className="absolute top-2 z-1 right-2 ">
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_TOKEN}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-white p-2 opacity-90 hover:opacity-100 rounded-full cursor-pointer outline-none shadow-lg"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout
                        className="text-red-500 hover:text-red-700"
                        fontSize={22}
                      />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
          </div>
          {/* buttons */}
          <div className="text-center mb-7 mt-7">
            {/* Created button */}
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyle : notActiveBtnStyle
              }`}
            >
              Created
            </button>
            {/* Saved button */}
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyle : notActiveBtnStyle
              }`}
            >
              Saved
            </button>
          </div>
          {/* displaying the pins */}
          <h2 className="text-3xl font-bold mb-2 ml-2 text-gray-800 font-mono">
            {/* products title */}
            {activeBtn === "created" ? "Goods Sale" : "Saved Products"}
          </h2>
          <hr className="mb-2" />
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center items-center font-bold w-full text-xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
