// PinDetail.jsx
import React, { useState, useEffect } from "react";
// react-icons
import { IoCloudDownload, IoSend } from "react-icons/io5";
// router
import { Link, useParams } from "react-router-dom";
// uuid
import { v4 as uuidv4 } from "uuid";

// export url
import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = () => {
  return <div>PinDetail</div>;
};

export default PinDetail;
