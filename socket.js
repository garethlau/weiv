module.exports = (app, io) => {
  // Listen for new socket connections
  io.sockets.on("connection", socket => {
    let roomId = "";
    socket.username = "Anonymous";

    console.log(`New connection: ${socket.id}`);

    // Listen for events emitted from clients
    socket.on("FROM_CLIENT", action => {
      // Check the action type
      switch (action.type) {
        case "ESTABLISH_CONNECTION":
          socket.join(action.payload, () => {
            console.log(`Joined room: ${action.payload}`);
            roomId = action.payload;
          });
          break;
        case "PLAY":
          console.log(`[${socket.id}] PLAY`);
          socket.broadcast
            .to(roomId)
            .emit("FROM_SERVER", { type: "PLAY", payload: action.payload });
          break;
        case "PAUSE":
          console.log(`[${socket.id}] PAUSE`);
          socket.broadcast
            .to(roomId)
            .emit("FROM_SERVER", { type: "PAUSE", payload: action.payload });
          break;
        default:
          console.log("Case not handled");
      }
    });

    // Listen for chat events emitted from clients
    const CHAT_ACTION_FROM_SERVER = "CHAT_ACTION_FROM_SERVER";
    const CHAT_ACTION_FROM_CLIENT = "CHAT_ACTION_FROM_CLIENT";
    const CHAT_ACTIONS = {
      NEW_MESSAGE: "NEW_MESSAGE",
      TYPING: "TYPING",
      CHANGE_USERNAME: "CHANGE_USERNAME"
    };

    socket.on(CHAT_ACTION_FROM_CLIENT, action => {
      switch (action.type) {
        case CHAT_ACTIONS.CHANGE_USERNAME:
          console.log("Setting username: " + action.payload);
          socket.username = action.payload;
          break;
        case CHAT_ACTIONS.NEW_MESSAGE:
          console.log(`[${socket.username}] ${action.payload} ${Date.now()}`);
          io.in(roomId).emit(CHAT_ACTION_FROM_SERVER, {
            type: CHAT_ACTIONS.NEW_MESSAGE,
            payload: {
              username: socket.username,
              message: action.payload,
              date: Date.now()
            }
          });
          break;
        case CHAT_ACTIONS.TYPING:
          console.log(typing);
          socket.boradcast
            .to(roomId)
            .emit(CHAT_ACTION_FROM_SERVER, { type: CHAT_ACTIONS.TYPING });
          break;
        default:
          console.log("Case not handled");
      }
    });

    // Check for disconnections
    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });
};
