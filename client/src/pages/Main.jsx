import React, { useContext } from "react";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import ChatPage from "../pages/ChatPage";

const Main = () => {
  const { dataUser } = useContext(AuthContext);

  return (
    <>
      {dataUser.isLogged ? (
        <>
          <ChatPage />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Main;
