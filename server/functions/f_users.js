const findUser = (users, user) => {
  const _user = users.find((element) => element.email === user.email);
  return _user;
};

/* const getUsersAvailable = (users_admin, users_logged) => {
  console.log("check usersAvailable");
  console.log("users_admin", users_admin);
  console.log("users_logged", users_logged);
  const users_available = users_admin.filter(
    (ua) => !users_logged.some((ul) => ul.nickname === ua.user)
  );
  console.log("users_available", users_available);
  return users_available;
}; */

const getUsersAvailable = (users_admin, users_logged) =>
  users_admin.filter(
    (ua) => !users_logged.some((ul) => ul.nickname === ua.user)
  );

module.exports = { findUser, getUsersAvailable };
