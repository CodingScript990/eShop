// Spinner.jsx
import React from "react";
// react-loader-library
import { Watch } from "react-loader-spinner";

const Spinner = ({ msg }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      <Watch color="#767677" height={80} width={80} />
      <p className="text-lg text-center px-2">{msg}</p>
    </div>
  );
};

export default Spinner;
