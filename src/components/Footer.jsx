import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative w-full h-full">
      <div>
        <p>
          사이트명 : <Link to="/">eShop</Link>
        </p>
        <p>주제 : 쇼핑몰 & 커뮤니티 사이트</p>
        <p>주제 : 쇼핑몰 & 커뮤니티 사이트</p>
        <p>주제 : 쇼핑몰 & 커뮤니티 사이트</p>
      </div>
      <div>
        <p>Copyright © Kim Min Woo. 2022 All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
