// MasonryLayout.jsx
import React from "react";
// css library
import Masonry from "react-masonry-css";
// export pin
import Pin from "./Pin";

// breakpoint Obj => colum size
const breakpointsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  // pins => props
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointsObj}>
      {/* pin => product list => All Products views![client] */}
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
