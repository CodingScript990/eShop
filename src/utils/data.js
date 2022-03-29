// data.js
// user query
export const userQuery = (userId) => {
  // query value => type = 'user' && '_id'
  const query = `*[_type == 'user' && _id == '${userId}']`;
  // return user query
  return query;
};
