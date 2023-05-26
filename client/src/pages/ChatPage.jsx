import React, { useContext, useState, useEffect, useRef } from "react";
import ChatUsers from "../components/Chat/ChatUsers";
import ChatConversation from "../components/Chat/ChatConversation";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";
import { Box, Button, Stack } from "@mui/material";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET, {
  transports: ["websocket", "polling", "flashsocket"],
});

export default function Chat() {
  const { dataUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]); //{nick,socketId,cantMsg}
  const [channel, setChannel] = useState("global");
  const [currentChat, setCurrentChat] = useState([]);
  const [filter, setfilter] = useState("");

  const initUsers = (usersServer) => {
    const _users = usersServer.map((e) => {
      return { ...e, cantMsg: 0, pchat: [] };
    });
    setUsers([{ nickname: "global", cantMsg: 0, pchat: [] }, ..._users]);
  };

  const removeUser = (nick) => {
    setUsers((old) => old.filter((u) => u.nickname !== nick));
    nick.trim() === channel.trim() && setChannel("global");
    setCurrentChat(
      users.reduce((a, curr) => {
        if (curr.nickname === "global") {
          a = [...curr.pchat];
        }
        return a;
      }, [])
    );
  };

  const addUser = ({ nickname, socketId }) => {
    setUsers((prev) => [
      ...prev,
      { nickname, socketId, cantMsg: 0, pchat: [] },
    ]);
  };

  const addPvtMessage = (data) => {
    data.time = new Date();
    const _users = users.map((u) => {
      if (u.nickname === data.sender) {
        if (data.sender !== channel.trim()) {
          u.cantMsg++;
        } else {
          setCurrentChat((prev) => [...prev, data]);
        }
        u.pchat = [...u.pchat, data];
      }
      return u;
    });
    setUsers(_users);
  };

  const addGlobalMessage = (data) => {
    data.time = new Date();
    const newMsg = {
      sender: data.from.trim(),
      msg: data.msg,
      time: data.time,
    };
    // console.log("global msg..", data);
    const _users = users.map((u) => {
      if (u.nickname === "global") {
        if (channel !== "global") {
          u.cantMsg++;
        } else {
          setCurrentChat((prev) => [...prev, newMsg]);
        }
        u.pchat = [...u.pchat, newMsg];
      }
      return u;
    });
    setUsers(_users);
  };

  const addOwnPvtMessage = (data) => {
    data.time = new Date();
    const _users = users.map((u) => {
      if (u.nickname === channel) {
        u.pchat = [...u.pchat, data];
      }
      return u;
    });
    setUsers(_users);
    setCurrentChat((prev) => [...prev, data]);
  };

  const handleChangeChannel = (newChannel) => {
    // if (newChannel !== channel) {
    const _users = users.map((u) =>
      u.nickname === newChannel ? { ...u, cantMsg: 0 } : u
    );
    setUsers(_users);
    setChannel(newChannel);
    setCurrentChat(
      users.reduce((a, curr) => {
        if (curr.nickname === newChannel) {
          a = [...curr.pchat];
        }
        return a;
      }, [])
    );
  };

  const handleInputMessage = (message) => {
    //console.log("envio mensaje ", message);
    if (channel === "global") {
      // addOwnGlobalMessage(message);
      socket &&
        socket.emit("enviar mensaje", {
          from: dataUser.user,
          msg: message,
        });
      //addOwnGlobalMessage({ from: dataUser.user, msg: message }); lo recibo igual -> no lo agrego
    } else {
      //console.log("envio mensaje privado", message);
      socket &&
        socket.emit("mensaje_privado", {
          sender: dataUser.user,
          to: channel.trim(),
          msg: message,
        });

      addOwnPvtMessage({ sender: dataUser.user, to: channel, msg: message });
    }
  };

  useEffect(() => {
    //console.log("render is logged Chat", dataUser, "socket", socket);

    socket &&
      socket.emit("nuevo_usuario", dataUser.user, (exito, usersServer) => {
        exito && initUsers(usersServer);
      });

    return () => {};
  }, [socket, dataUser.isLoggedChat, dataUser.user]);

  useEffect(() => {
    socket.on("private-msg", addPvtMessage);
    socket.on("user_logout", removeUser);
    socket.on("nuevo_usuario", addUser);
    socket.on("nuevo mensaje", addGlobalMessage);
    return () => {
      //console.log("me fui");
      socket.off("user_logout");
      socket.off("nuevo_usuario");
      socket.off("private-msg");
      socket.off("nuevo mensaje");
    };
  }, [users]);

  useEffect(() => {
    //console.log("---- 2 do  useEffect ----------------");
    socket.on("connect", () => {
      // console.log("connected");
      socket.emit("nuevo_usuario", dataUser.user, (exito, usersServer) => {
        exito && initUsers(usersServer);
      });
    });
    socket && socket.emit("get_users", dataUser.user, initUsers);

    return () => {
      //console.log("me fui");
      socket.off("connect");
    };
  }, [socket]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          marginTop: "8px",
        }}
      >
        <Stack
          direction="row"
          sx={{ marginLeft: "15px", marginBottom: "15px" }}
          // justifyContent="space-around"
        >
          <SearchBar setFilter={setfilter} />
          <Button variant="text" disabled>
            {channel}
          </Button>
        </Stack>
        <Stack direction="row" spacing={10}>
          <Stack
            spacing={1}
            sx={{ width: "28%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <h4>{dataUser.user} </h4>

            <ChatUsers
              users={users}
              handleChangeChannel={handleChangeChannel}
              channel={channel}
              filter={filter}
            />
          </Stack>
          <ChatConversation
            handleInputMessage={handleInputMessage}
            currentChat={currentChat}
            channel={channel}
          />
        </Stack>
      </Box>
    </>
  );
}
