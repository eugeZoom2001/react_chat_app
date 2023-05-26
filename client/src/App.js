import React, { useContext } from "react";
import Main from "./pages/Main";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";

const App = () => {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
};

export default App;
