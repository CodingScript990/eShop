// NavBar.jsx
import React, { useState, useEffect, useRef } from "react";
// index.css
import "../index.css";
// router
import { Link, NavLink, useNavigate } from "react-router-dom";
// react-icons
import { BiSearchAlt, BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { RiHome7Fill } from "react-icons/ri";
// add pin
import { FaCartPlus } from "react-icons/fa";
// basket
import { GiShoppingCart } from "react-icons/gi";

// logo
import logo from "../assets/eShop-logo4.png";
// category arry[data => products]
import { categories } from "../utils/data";

// Active style
const isActiveStyles =
  "flex items-center px-2 md:px-2 gap-2 md:gap-4 font-extrabold transition-all duration-150 ease-in-out capitalize";
// notActive style
const isNotActiveStyle =
  "flex items-center px-2 md:px-5 gap-2 md:gap-4 text-gray-500 hover:text-black transition-all duration-150 ease-in-out capitalize";

const NavBar = ({ user, searchTerm, setSearchTerm }) => {
  // user active && user action => user, search function[data]
  // useNavigate
  let navigate = useNavigate();
  // scroll State
  const [isScroll, setIsScroll] = useState(false);
  // use effect
  useEffect(() => {}, [isScroll]);
  // scroll Ref
  const scrollRef = useRef();
  // scroll event handler
  const scrollOnClick = (side) => {
    // setIsScroll
    setIsScroll(true);
    // props === state click => 200 px
    side === "right"
      ? (scrollRef.current.scrollLeft += 200)
      : (scrollRef.current.scrollLeft -= 200);

    scrollRef.current.scrollLeft < 199 ? setIsScroll(false) : setIsScroll(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full py-3">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-20 cursor-pointer" />
        </Link>

        {/* Search Box */}
        <div className="flex justify-between items-center w-full bg-white p-2 shadow-md rounded-lg mx-4">
          <BiSearchAlt fontSize={30} className="text-gray-700" />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none border-none px-3 text-gray-800 font-semibold text-base"
            onFocus={() => navigate("/search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Product Button */}
        <div className="flex justify-center items-center">
          {/* Add product */}
          {user?._id !== null ? (
            <>
              <Link
                to="create-pin"
                className="p-2 justify-center font-bold text-base text-slate-400 border-none hover:text-slate-700 rounded-md duration-150 ease-in-out md:flex hidden"
              >
                <FaCartPlus className="w-9 h-6" />
              </Link>
            </>
          ) : null}

          {/* user profile */}
          <Link
            to={`user-profile/${user?._id}`}
            className="flex items-center justify-center w-10 min-w-10 h-10 min-h-10 rounded-full ml-4"
          >
            {user?._id !== null ? (
              <img src={user?.image} className="rounded-full" alt="Pic" />
            ) : (
              <Link to="/login" className="text-slate-600 text-lg font-bold">
                Login
              </Link>
            )}
          </Link>
        </div>
      </div>
      {/* categories */}
      <div
        className="flex items-center w-full py-3"
        style={{ margin: "0 auto" }}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyle
          }
        >
          <RiHome7Fill fontSize={30} />
        </NavLink>
        <div className="h-6 w-[1px] bg-slate-600"></div>
        {/* categories-items */}
        <div className="flex items-center w-full h-16 overflow-y-scroll hide_scrollbar relative">
          {/* categories-icon[left] */}
          <div
            className={`${
              isScroll ? "flex" : "hidden"
            }  absolute left-0 w-32 h-10 justify-start items-center bg-gradient-to-r from-white cursor-pointer`}
            onClick={() => scrollOnClick("left")}
          >
            <BiChevronLeft fontSize={30} />
          </div>
          {/* categories */}
          <div
            className="flex items-center text-center w-full overflow-y-scroll hide_scrollbar scroll-smooth duration-150 ease-in-out"
            ref={scrollRef}
          >
            {categories.slice(0, categories.length).map((category) => (
              <NavLink
                to={`/category/${category.name}`}
                key={category.name}
                className={({ isActive }) =>
                  isActive ? isActiveStyles : isNotActiveStyle
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
          <div
            className={`absolute right-0 w-32 h-10 md:flex hidden justify-end items-center bg-gradient-to-l from-white cursor-pointer`}
            onClick={() => scrollOnClick("right")}
          >
            <BiChevronRight fontSize={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
