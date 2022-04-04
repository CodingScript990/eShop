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

const CreatePin = () => {
  // useState => views data products => write[data]
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
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
      </div>
    </div>
  );
};

export default CreatePin;
