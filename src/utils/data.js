// data.js

// export categories
export const categories = [
  {
    name: "Car",
    image:
      "https://i.pinimg.com/736x/5a/59/cc/5a59cc752eb0651c422817424701fbb3.jpg",
  },
  {
    name: "PC",
    image:
      "https://www.pngitem.com/pimgs/m/53-538103_transparent-clean-car-png-usa-car-detailing-products.png",
  },
  {
    name: "Appliances",
    image:
      "https://www.pngplay.com/wp-content/uploads/7/Car-Accessories-Download-Free-PNG.png",
  },
  {
    name: "Book",
    image:
      "https://cdn.recaro-automotive.com/fileadmin/01-products/dynamic/pole-position-abe/recaro-pole-position-abe-product.png?v=1613561453",
  },
  {
    name: "Food",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    name: "Clothes",
    image: "https://i.ytimg.com/vi/jTIOz6g7rrw/maxresdefault.jpg",
  },
  {
    name: "Camera",
    image: "https://i.ytimg.com/vi/3DFQ5p5G1VY/maxresdefault.jpg",
  },
  {
    name: "Phone",
    image:
      "https://stay-trendy.com/wp-content/uploads/2019/06/fashion-dresses-2020.jpg",
  },
  {
    name: "Communication",
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

// userCreatedPinQuery
export const userCreatedPinsQuery = (userId) => {
  // query value => 'userId'
  const query = `*[_type == 'pin' && userId == '${userId}'] | order(_createAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    price,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  // return query
  return query;
};

// userSavedPinsQuery => userId
export const userSavedPinsQuery = (userId) => {
  // query => userId
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    price,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  // return query
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
    price,
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
  price,
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

// export pinDeatilQuery
export const pinDetailQuery = (pinId) => {
  // query type
  const query = `*[_type == "pin" &&  _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    price,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  // return query
  return query;
};

// export pinDeatilMorePinQuery
export const pinDeatilMorePinQuery = (pin) => {
  // query type
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}'] {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    price,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  // return query
  return query;
};
