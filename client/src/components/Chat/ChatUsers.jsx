import {
  Badge,
  ListItem,
  List,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const UserItem = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    //console.log("Nuevo Channel", e.target.innerText);
    e.target.innerText !== props.channel &&
      props.handleChangeChannel(e.target.innerText);
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "row" }}>
      <ListItem
        onClick={(e) => handleClick(e)}
        sx={{ cursor: "pointer", mr: "2px" }}
      >
        <ListItemText primary={props.user} />
        <Badge color="error" badgeContent={props.cantMsg} sx={{ ml: "10px" }} />
      </ListItem>
    </Container>
  );
};

const ChatUsers = ({ users, handleChangeChannel, channel, filter }) => {
  ///

  const filteredUsers = (users, filter) =>
    filter.length > 0
      ? users.filter(
          (u) =>
            u.nickname === "global" ||
            u.nickname.toLowerCase().includes(filter.toLowerCase())
        )
      : [...users];

  return (
    <>
      <Box
        component="span"
        sx={{
          p: 4,
          border: "1px solid grey",
          marginLeft: "15px",
          background: "#f4f6f6",
          borderRadius: "10px",
        }}
      >
        <List sx={{ width: "100%", maxWidth: 360 }}>
          {filteredUsers(users, filter).map((user) => {
            return (
              <div key={user.nickname}>
                <UserItem
                  user={user.nickname}
                  cantMsg={user.cantMsg}
                  channel={channel}
                  handleChangeChannel={handleChangeChannel}
                />
                <Divider />
              </div>
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default ChatUsers;
