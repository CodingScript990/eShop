// Pin.jsx
import React, { useState } from "react";

// router
import { Link, useNavigate } from "react-router-dom";

// uuid
import { v4 as uuidv4 } from "uuid";

// react-icons
import { IoCloudDownload, IoArrowRedo } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";

// client url
import { client, urlFor } from "../client";

// export fetchUser!
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  // pin => props
  // navigate
  const navigate = useNavigate();
  // useState post hover
  const [postHovered, setPostHovered] = useState(false);

  // user
  const user = fetchUser();

  // save button? or saved button => client views not save button? saved button
  const alreadySaved = !!save?.filter(
    (item) => item.postedBy?._id === user?.googleId
  ).length;

  // savePin data => products id
  const savePin = (id) => {
    // client id === product id && save client id === product id
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            // client info === save id
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          // save button click => event start => change view! => client save products! => finish!
          window.location.reload();
        });
    }
  };

  // client event handler => delete pin!
  const deletePin = (id) => {
    // delete => client id === product add id?
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      {/* image => products */}
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="images"
          className="rounded-lg w-full"
        />
        {/* show the products hover => like, pin, info */}
        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pb-2 z-50">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <IoCloudDownload />
                </a>
              </div>
              {/* client try save? but client save? true => show the saved not save client => show the save button */}
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-gray-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shahdow-md outline-none"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-gray-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shahdow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            {/* Don't destination */}
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-neutral-100 flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <IoArrowRedo />
                  {/* url text 15 ↑ => ... but not 15 ↓ => view url text */}
                  {destination.length > 15
                    ? `${destination.slice(0, 15)}...`
                    : destination}
                </a>
              )}
              {/* buyer add product view id */}
              {postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-gray-500 p-2 opacity-70 hover:opacity-100 text-white font-bold text-base rounded-full shadow-md outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* go to client profile url */}
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        {/* upload client show name */}
        <img
          src={postedBy?.image}
          alt="user-img"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
