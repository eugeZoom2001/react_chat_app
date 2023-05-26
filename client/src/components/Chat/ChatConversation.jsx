import { Container, Paper, IconButton, InputBase } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { fechaHora } from "../../utils/fechas";

import React, { useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const MessageItem = ({ item, channel }) => {
  const { dataUser } = useContext(AuthContext);
  //console.log("props", item);
  return (
    <ListItem
      sx={{
        textAlign: dataUser.user === item.sender ? "right" : "left",
      }}
    >
      <ListItemText
        primary={
          channel === "global" ? item.sender + ": " + item.msg : item.msg
        }
        secondary={fechaHora(new Date().toISOString())}
        sx={{ color: dataUser.user === item.sender ? "#aeb6bf" : "black" }}
      />
    </ListItem>
  );
};

const ChatConversation = ({ currentChat, handleInputMessage, channel }) => {
  const textRef = useRef();
  const scrollRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    handleInputMessage(textRef.current.value);
    textRef.current.value = "";
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [currentChat]);

  return (
    <>
      <Container fixed sx={{ display: "flex", flexDirection: "column" }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {currentChat.map((c, index) => {
            return (
              <div key={index} ref={scrollRef}>
                {" "}
                <MessageItem item={c} channel={channel} />{" "}
              </div>
            );
          })}
        </List>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 800,

            marginBottom: 20,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            name="entrada"
            inputRef={textRef}
            placeholder="Escribe"
            inputProps={{ "aria-label": "Escribe" }}
          />
        </Paper>
      </Container>
    </>
  );
};

export default ChatConversation;
