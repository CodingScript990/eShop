// Home.jsx
import React, { useState, useRef, useEffect } from "react";
// router
import { Route, Routes } from "react-router-dom";
// client
import { client } from "../client";
import { userQuery } from "../utils/data";
import Pin from "./Pin";

// export fetchUser!
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  // user state[set => data]
  const [user, setUser] = useState(null);
  // scroll reference
  const scrollRef = useRef(null);
  // getting the Logged in user info from the localstorage
  const userInfo = fetchUser();

  // useEffect => user query[request]
  useEffect(() => {
    // user query => googleId!
    const query = userQuery(userInfo?.googleId);
    // user get data => fetch API
    client.fetch(query).then((data) => {
      // save storage user data[0]
      setUser(data[0]);
    });
  }, []);

  // useEffect => user state manage(관리)
  useEffect(() => {
    // set scroll to top of the page
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="flex flex-col transition-height duration-75 ease-out"
      style={{ height: "fit-content" }}
    >
      <div
        className="pb-2 flex-1 h-full overflow-y-scroll hide_scrollbar"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/*" element={<Pin user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
