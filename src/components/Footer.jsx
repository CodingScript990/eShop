import React from "react";
// router
import { Link } from "react-router-dom";
// logo
import logo from "../assets/eShop-logo4.png";
// react-icons
import { AiFillGithub, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

function Footer() {
  // github event handler
  const gitURL = () => {
    // _blank go to github
    let git = window.open("https://github.com/CodingScript990/eShop", "_blank");
    // return git value
    return git;
  };
  // email event handler
  const emailClick = () => {
    // email
    let mailto_email = "mailto:a41787192@gmail.com";
    // send email
    window.location.href = mailto_email;
  };
  return (
    <div style={{ marginTop: "auto" }}>
      <footer className="flex flex-col p-2 justify-center items-center bg-slate-100 border-t-gray-300 border-2 text-gray-800">
        <div className="flex flex-col mb-3">
          <div className="flex flex-row items-center mb-2">
            <img src={logo} alt="logo" className="h-10 mr-2 " />
            <Link to="/" className="font-bold text-gray-700 hover:text-sky-700">
              eShop
            </Link>
          </div>
          <div className="flex flex-row mb-2">
            <AiOutlineUser fontSize={30} />
            <p>김민우(Kim Min Woo)</p>
          </div>
          <div class="flex flex-row mb-2">
            <AiFillGithub fontSize={30} />
            <p
              className="cursor-pointer ml-2 hover:text-sky-700"
              onClick={gitURL}
            >
              CodingScript990/eShop
            </p>
          </div>
          <div className="flex flex-row">
            <AiOutlineMail fontSize={30} />
            <p
              className="cursor-pointer ml-2 hover:text-sky-700"
              onClick={emailClick}
            >
              a41787192@gmail.com
            </p>
          </div>
        </div>
        <div>
          <p className="font-bold text-base">
            Copyright © Kim Min Woo. 2022 All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
