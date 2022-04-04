// CreatePin.jsx
import React, { useState } from "react";
// react-icons
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
// router
import { useNavigate } from "react-router-dom";

// export url
import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
  // useState => views data products => write[data]
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  // loading
  const [loading, setLoading] = useState(false);
  // field, category State
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  // image
  const [imageAssets, setImageAssets] = useState(null);
  // wrongImage
  const [wrongImageType, setWrongImageType] = useState(false);

  // navigate
  const navigate = useNavigate();

  // upload event handler => client click event file upload!
  const uploadImage = (e) => {
    // file value
    const { type, name } = e.target.files[0];
    // png, svg, jpg... file type
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/jpg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      // active function => not file type? loading start and view the loading icon!
      setWrongImageType(false);
      setLoading(true);
      // but client event click? contentType, filename give data
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          // client upload image data => in storage![In database!]
          setImageAssets(doc);
          setLoading(false);
          // but error? show the error code!!
        })
        .catch((err) => console.log("image upload : ", err));
    } else {
      // but true file upload type?
      setWrongImageType(true);
    }
  };

  // client save button handler
  const savePin = () => {
    // if save condition?
    if (
      title &&
      about &&
      destination &&
      price &&
      imageAssets?._id &&
      category
    ) {
      // doc type => 'pin'![Obj]
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        price,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAssets?._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: "postedBy",
          _ref: user?._id,
        },
        category,
      };
      // client good write? => go to data => storage => Where go to url? Go home here!
      client.create(doc).then(() => {
        // successfully go to url
        navigate("/");
      });
    } else {
      // save true!
      setFields(true);
      // but not save false? error message is showtime 2s!
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {/* error messages */}
      {fields && (
        <p className="text-red-500 text-xl transition-all duration-150 ease-in-out">
          Please fill in all the fields!
        </p>
      )}

      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-420">
            {/* image type analysis => wait views function */}
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAssets ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <p className="font-bold text-2xl">
                      <BiCloudUpload fontSize={30} />
                    </p>
                    {/* image upload button */}
                    <p className="text-lg">Click to upload</p>
                  </div>
                  {/* show the exceed the capacity message */}
                  <p className="mt-16 text-gray-400">
                    Use High quality images less than 20MB!
                  </p>
                </div>
                {/* client file upload image */}
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                {/* views successfully client image */}
                <img
                  src={imageAssets?.url}
                  className="w-full h-full"
                  alt="showImage"
                />
                {/* upload image delete button */}
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-gray-100 text-xl text-gray-700 cursor-pointer outline-none hover:shadow-md hover:bg-slate-700 hover:text-white duration-500 ease-in-out transition-all"
                  onClick={() => setImageAssets(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* input fields */}
        <div className="flex flex-1 flex-col gap-6 ml-5 w-full">
          <div className="flex flex-col">
            <div>
              <p className="mb-2 ml-1 font-semibold text-gray-700 text-lg sm:text-xl">
                Choose pin category
              </p>
              {/* select category */}
              <select
                id="categoryList"
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base text-gray-700 border-b-2 border-gray-200 hover:shadow-md hover:border-gray-300 p-2 mb-8 rounded-md cursor-pointer"
                required
              >
                <option value="other" className="bg-white" hidden>
                  Select Category
                </option>
                {/* categories list */}
                {categories &&
                  categories.map((category) => (
                    <option
                      value={category.name}
                      className="text-base border-0 outline-none capitalize bg-white text-gray-700"
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add your title here!"
              className="w-4/5 outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 focus:border-gray-400"
            />
            {/* about */}
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="What is your pin about!"
              className="w-4/5 outline-none text-base sm:text-lg border-b-2 border-gray-200 focus:border-gray-400 p-2 mt-2"
            />
            {/* destination(url) */}
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Add your destination here!"
              className="w-4/5 outline-none text-base sm:text-lg border-b-2 border-gray-200 focus:border-gray-400 p-2 mt-2"
            />
            {/* price */}
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Wrtie price!"
              className="w-4/5 outline-none text-base sm:text-lg border-b-2 border-gray-200 focus:border-gray-400 p-2 mt-2"
            />
          </div>

          {/* user */}
          {user && (
            <div className="w-1/5 flex gap-2 my-2 items-center bg-white text-gray-700 rounded-lg">
              <img
                src={user?.image}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <p className="font-bold">{user?.userName}</p>
            </div>
          )}

          {/* Save Pin Button */}
          <div className="w-4/5 flex justify-end mt-1">
            <button
              type="button"
              className="bg-gray-400 text-white font-bold rounded-md w-28 outline-none p-2 hover:shadow-md hover:bg-gray-500 duration-150 transition-all ease-in-out"
              onClick={savePin}
            >
              Save Pin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
