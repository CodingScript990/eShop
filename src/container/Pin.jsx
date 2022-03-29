// Pin.jsx
import React, { useState } from "react";
// router
import { Routes, Route } from "react-router-dom";
// global jsx export
import {
  NavBar,
  Feed,
  PinDetail,
  CreatePin,
  Search,
  UserProfile,
} from "../components";

const Pin = ({ user }) => {
  // props => user
  // search state => user data find? where site data? write searching => finding data!! => Good!
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-white">
        {/* NavBar */}
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pin;
