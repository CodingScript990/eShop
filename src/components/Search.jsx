// Search.jsx
import React, { useState, useEffect } from "react";

// MasonryLayoout
import MasonryLayout from "./MasonryLayout";
// client
import { client } from "../client";
// query
import { feedQuery, searchQuery } from "../utils/data";
// loading
import Spinner from "./Spinner";
// notfound img
import NoutImage from "../assets/notfound-img.jpg";

const Search = ({ searchTerm, setSearchTerm }) => {
  // search props
  // pins useState
  const [pins, setPins] = useState(null);
  // loading useState
  const [loading, setLoading] = useState(null);

  // effect
  useEffect(() => {
    // if searchTerm => client searching => data
    if (searchTerm) {
      // loading
      setLoading(true);
      // query => searching
      const query = searchQuery(searchTerm.toLowerCase());
      // client response Api => pins data
      client.fetch(query).then((data) => {
        // pins[data]
        setPins(data);
        // not loading
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);
  return (
    <div>
      {/* loading */}
      {loading && <Spinner msg={"Searching for pins!"} />}
      {/* pins is true === pins */}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {/* pins is false === not pins */}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <p>Sorry 😢 No products found!</p>
          <img src={NoutImage} alt="no-img" className="w-[30%] mt-5" />
        </div>
      )}
    </div>
  );
};

export default Search;
