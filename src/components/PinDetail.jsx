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
import { pinDeatilMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  // props user
  // Pin data State
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  // pinId value
  const { pinId } = useParams();

  // fetchPinDetail function
  const fetchPinDetail = () => {
    // query => pinId
    let query = pinDetailQuery(pinId);
    // if client query succesful data?
    if (query) {
      client.fetch(query).then((data) => {
        // save pinDeatil data!
        setPinDetail(data[0]);
        // but pinDeatil data index[0]?
        if (data[0]) {
          // query data
          query = pinDeatilMorePinQuery(data[0]);
          // client api response => data!
          client.fetch(query).then((res) => {
            // pins response data
            setPins(res);
          });
        }
      });
    }
  };

  // useEffect => PinId state
  useEffect(() => {
    // api => fecth pinDetail
    fetchPinDetail();
  }, [pinId]);

  // pinDeatil is not? => show the page and message?[user, client]
  if (!pinDetail) return <Spinner msg={"Loading pindetail!"} />;

  return (
    <div
      className="flex xl:flex-row flex-col m-auto bg-white p-4"
      style={{ maxWidth: "1500px", borderRadius: "35px" }}
    >
      {/* image */}
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          alt="img"
          className="rounded-3xl rounded-b-lg"
        />
      </div>

      {/* pin details */}
      <div className="w-full p-5 flex-1 xl:min-w-620">
        {/* url destination & download */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <a
              href={`${pinDetail?.image?.asset?.url}`}
              download
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
            >
              <IoCloudDownload />
            </a>
          </div>
          <a href={pinDetail?.destination} target="_blank" rel="noreferrer">
            {pinDetail?.destination.length > 15
              ? `${pinDetail?.destination.slice(0, 15)}...`
              : pinDetail?.destination}
          </a>
        </div>
        {/* title */}
        <div>
          <h1 className="text-4xl font-bold mt-3 break-words"></h1>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
