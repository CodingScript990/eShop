// NavBar.jsx
import React, { useState, useEffect, useRef } from "react";
// router
import { Link, NavLink, useNavigate } from "react-router-dom";
// react-icons
import {
  BiSearchAlt,
  BiPlus,
  BiChevronRight,
  BiChevronLeft,
} from "react-icons/bi";
import { RiHome7Fill } from "react-icons/ri";
// logo
import logo from "../assets/eShop-logo3.png";
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
  const navigate = useNavigate();
  // scroll State
  const [isScroll, setIsScroll] = useState(false);
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
          <img src={logo} alt="Logo" className="w-40 cursor-pointer" />
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

        {/* Add Button */}
        <div className="flex justify-center items-center">
          <Link to="create-pin">
            <button
              type="button"
              className="w-36 min-w-36 p-2 justify-center text-base text-white bg-slate-400 border border-gray-300 rounded-md hover:bg-slate-500 duration-150 ease-in-out md:flex hidden"
            >
              Submit a photo
            </button>
            {/* small screen add button */}
            <div className="bg-black w-10 h-10 rounded-md md:hidden flex items-center justify-center">
              <BiPlus fontSize={24} className="text-white" />
            </div>
          </Link>
          {/* user profile */}
          <Link
            to={`user-profile/${user?._id}`}
            className="flex items-center justify-center w-10 min-w-10 h-10 min-h-10 shadow-lg rounded-full ml-4"
          >
            <img src={user?.image} className="rounded-full" alt="Pic" />
          </Link>
        </div>
      </div>
      {/* categories */}
      <div className="flex items-center w-full py-3">
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
            {categories.slice(0, categories.length - 1).map((category) => (
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
