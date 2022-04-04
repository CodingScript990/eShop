// Fedd.jsx
import React, { useState, useEffect } from "react";
// router
import { useParams } from "react-router-dom";
// export url
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
// image => Use to site => Vecteezy[https://www.vecteezy.com/]
import NotFound from "../assets/notfound-img.jpg";
import { searchQuery, feedQuery } from "../utils/data";
// client
import { client } from "../client";

const Feed = () => {
  // useState => loading
  const [loading, setLoading] = useState(false);
  // pin state
  const [pins, setPins] = useState(null);
  // Get the category from URL
  const { categoryId } = useParams();

  // useEffect => user click event show the category products!
  useEffect(() => {
    // loading => category => products === categoryId
    setLoading(true);
    // categoryId === query! show the category products!
    if (categoryId) {
      // query[user search!]
      const query = searchQuery(categoryId);
      // client => query request? => show the pins[products]
      client.fetch(query).then((data) => {
        // setPins[data]
        setPins(data);
        // stop loading
        setLoading(false);
      });
    } else {
      // client => query request? show the pin but not products!
      client.fetch(feedQuery).then((data) => {
        // setPins[data]
        setPins(data);
        // stop loading
        setLoading(false);
      });
    }
  }, [categoryId]);

  // if => loading active => true! => show loading icon and request data[user]
  if (loading) return <Spinner msg={"New Fedds are loading"} />;
  // not pins?
  if (!pins?.length)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          Sorry 👀 No feed Available...
        </p>
        <img
          src={NotFound}
          className="md:w-[25%] w-[70%] mt-5"
          alt="notfound-img"
        />
      </div>
    );

  // pins data true!
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
