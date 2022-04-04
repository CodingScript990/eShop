// data.js

// export categories
export const categories = [
  {
    name: "MotorOIL",
    image:
      "https://i.pinimg.com/736x/5a/59/cc/5a59cc752eb0651c422817424701fbb3.jpg",
  },
  {
    name: "CleanCar",
    image:
      "https://www.pngitem.com/pimgs/m/53-538103_transparent-clean-car-png-usa-car-detailing-products.png",
  },
  {
    name: "Camera",
    image:
      "https://www.pngplay.com/wp-content/uploads/7/Car-Accessories-Download-Free-PNG.png",
  },
  {
    name: "OperatingSeat",
    image:
      "https://cdn.recaro-automotive.com/fileadmin/01-products/dynamic/pole-position-abe/recaro-pole-position-abe-product.png?v=1613561453",
  },
  {
    name: "MackBook",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    name: "iPhone13Max",
    image: "https://i.ytimg.com/vi/jTIOz6g7rrw/maxresdefault.jpg",
  },
  {
    name: "iPadPro",
    image: "https://i.ytimg.com/vi/3DFQ5p5G1VY/maxresdefault.jpg",
  },
  {
    name: "Bohemian",
    image:
      "https://stay-trendy.com/wp-content/uploads/2019/06/fashion-dresses-2020.jpg",
  },
  {
    name: "AirForce",
    image:
      "https://sneakernews.com/wp-content/uploads/2014/04/white-on-white-air-force-1s-spring-2014.jpg",
  },
];

// user query
export const userQuery = (userId) => {
  // query value => type = 'user' && '_id'
  const query = `*[_type == 'user' && _id == '${userId}']`;
  // return user query
  return query;
};

// search query
export const searchQuery = (searchTerm) => {
  // query value => type = 'searchTerm'
  const query = `*[_type == 'pin' && title match '${searchTerm}]*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

// export feedQuery
export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;
