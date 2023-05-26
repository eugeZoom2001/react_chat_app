const initUsers = (usersServer, myNick) => {
  const usersChat = usersServer.map((u) => {
    if (u.nickname !== myNick) {
      return { cantMsg: 0, ...u };
    }
  });
  return usersChat;
};

const addUserFromServer = (usersServer, myNick) => {};
//console.log("user added", users);

const getUsers = (users, myUser) => {};

const addPMessage = (users, data) => {
  // let { sender, to, msg, time, myNick } = data,
  //   target;
  // if (myNick === sender.trim()) {
  //   target = to.trim();
  // } else {
  //   target = sender.trim();
  // }
  // if (target in users) {
  //   users[target].chats.push({ sender, msg, time });
  // } else {
  //   console.log("addPMessage :el usuario " + sender + "no existe");
  // }
};

const getMessagesFromChannel = (nick, users, channel) => {
  // let pChats = users[channel].chats;
  // users[channel].cantMsg = 0;
  // pChats.forEach((chat) => {
  //   let data = chat;
  //   data.myNick = nick;
  //   // addPMessageDOM(channel, data);
  // });
};

const addGlobalMessage = (globalChat, data) => {
  const { msg, time, from } = data;
  globalChat.chat.push({ from, msg, time });
};

export { initUsers, addPMessage, getUsers };
