// PinDetail.jsx
import React, { useState, useEffect } from "react";
// react-icons
import { IoSend } from "react-icons/io5";
// router
import { Link, useParams } from "react-router-dom";
// uuid
import { v4 as uuidv4 } from "uuid";

// export url
import { client, urlFor } from "../client";
import { pinDeatilMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  // props user
  // Pin data State
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // pinId value
  const { pinId } = useParams();

  // Add comment event handler
  const addComment = () => {
    if (comment) {
      // set comment value
      setAddingComment(true);
      // client api => pinId
      client
        .patch(pinId)
        .setIfMissing({ comment: [] })
        .insert("after", "comment[-1]", [
          {
            comment,
            _key: uuidv4,
            date: {
              _type: "date",
            },
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetail();
          setComment("");
          setAddingComment(false);
        });
    }
  };

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
    <>
      <div className="flex flex-col w-full h-full">
        <div
          className="flex xl:flex-row flex-row w-full h-full bg-white p-4"
          style={{
            maxWidth: "1500px",
            borderRadius: "35px",
          }}
        >
          {/* image */}
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              src={pinDetail?.image && urlFor(pinDetail.image).width(650).url()}
              alt="img"
              className="rounded-3xl rounded-b-lg"
            />
          </div>

          {/* pin details */}
          <div className="relative w-full p-3 flex-1 xl:min-w-620 flex justify-center items-center">
            {/* title */}
            <div className="flex flex-col justify-evenly relative leading-10 w-5/6 h-510 border-4 rounded-lg p-5">
              <h1 className="text-4xl ml-14 break-words text-slate-800 font-sans font-bold">
                {pinDetail?.title}
              </h1>
              <p className="mt-3 ml-14 text-2xl font-mono">
                {pinDetail?.about}
              </p>
              {/* url destination */}
              <div className="flex justify-start ml-14 items-center font-bold text-lg">
                Official URL :
                <a
                  href={pinDetail?.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 font-normal"
                >
                  {pinDetail?.destination.length > 15
                    ? `${pinDetail?.destination.slice(0, 33)}`
                    : pinDetail?.destination}
                </a>
              </div>
              {/* product-form */}
              <form>
                <div className="flex font-bold text-lg ml-14">
                  Quantity : {/* Choice amount */}
                  <select className="items-center border-2 border-gray-400 rounded outline-none text-slate-900 ml-3">
                    <option value="0" selected>
                      - Please Choose -
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                {/* price */}
                <div class="font-bold text-lg mt-6 ml-14">
                  Price : ${pinDetail?.price}
                </div>
                {/* Seller info */}
                <div className="flex items-center text-lg font-bold mt-7 ml-14">
                  Seller :
                  <Link
                    to={`user-profile/${pinDetail?.postedBy?._id}`}
                    className="flex gap-2 ml-2 items-center bg-white rounded-lg "
                  >
                    {pinDetail?.postedBy?.userName}
                  </Link>
                </div>
                {/* buy button */}
                <div className="flex justify-center mt-12">
                  <button
                    type="button"
                    onClick={addingComment}
                    class="w-508 h-12 bg-slate-500 text-white text-lg hover:bg-slate-600 font-bold rounded cursor-pointer"
                  >
                    Buying
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Comments */}
        <div style={{ width: "980px", margin: "0 auto 50px" }}>
          <h2 className="mt-5 mb-2 text-2xl">
            {/* comments length 0? => toString "0" not 0? comments length! */}
            Comments(
            {pinDetail.comment?.length > 0 ? pinDetail.comment.length : "0"})
          </h2>
          <hr />
          {/* container to post the comment */}
          <div className="flex flex-wrap items-center mt-6 gap-3">
            <Link to={`user-profile/${pinDetail?.postedBy?._id}`}>
              <img
                src={pinDetail.postedBy?.image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="user"
              />
            </Link>
            {/* comment-write */}
            <input
              type="text"
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-md focus:border-gray-300"
              placeholder="Please feel free to leave a review of the product!"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <IoSend
              fontSize={25}
              className="cursor-pointer text-slate-500 hover:text-slate-600"
              onClick={addComment}
            />
          </div>
          <div className="max-h-370 overflow-y-auto hide_scrollbar">
            {pinDetail?.comment?.map((cmt, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={i}
              >
                {/* user image => profile */}
                <img
                  src={cmt.postedBy.image}
                  alt="user-img"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
                {/* user name & user comment */}
                <div
                  className="w-full flex flex-row justify-between"
                  style={{ fontSize: "17px" }}
                >
                  <p className="pl-2">{cmt.comment}</p>
                  <p className="pr-2">
                    {new Date(cmt.date).toLocaleDateString("ko-KR", options)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PinDetail;
