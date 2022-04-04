// fetchUser.js
// export global callback!
export const fetchUser = () => {
  // getting the Logged in user info from the localstorage
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  // return userInfo
  return userInfo;
};
