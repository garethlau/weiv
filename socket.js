module.exports = (app, io) => {
  let queues = {};
  // Listen for new socket connections
  io.sockets.on("connection", socket => {
    let roomId = "";
    socket.username = "Anonymous";
    let lastAction = "";
    console.log(`New connection: ${socket.id}`);

    const MEDIA_ACTIONS = {
      QUEUE_UPDATED: "QUEUE_UPDATED",
      PLAY: "PLAY",
      PAUSE: "PAUSE",
      END: "END",
      ADD_TO_QUEUE: "ADD_TO_QUEUE",
      NEXT_VIDEO: "NEXT_VIDEO"
    };

    // Listen for events emitted from clients
    socket.on("FROM_CLIENT", action => {
      // Check the action type
      switch (action.type) {
        case "ESTABLISH_CONNECTION":
          // Join the room
          socket.join(action.payload, () => {
            console.log(`Joined room: ${action.payload}`);
            roomId = action.payload;
          });
          // Create queue for the room
          if (!queues[roomId]) {
            queues[roomId] = [];
          }
          // Send the current queue to everyone
          io.in(roomId).emit("FROM_SERVER", {
            type: MEDIA_ACTIONS.QUEUE_UPDATED,
            payload: queues[roomId]
          });
          break;
        case MEDIA_ACTIONS.PLAY:
          console.log(`[${socket.id}] PLAY`);
          socket.broadcast
            .to(roomId)
            .emit("FROM_SERVER", {
              type: MEDIA_ACTIONS.PLAY,
              payload: action.payload
            });
          break;
        case MEDIA_ACTIONS.PAUSE:
          console.log(`[${socket.id}] PAUSE`);
          socket.broadcast
            .to(roomId)
            .emit("FROM_SERVER", {
              type: MEDIA_ACTIONS.PAUSE,
              payload: action.payload
            });
          break;
        case MEDIA_ACTIONS.END:
          // Send the next video URL
          if (lastAction !== "END") {
            console.log(`[${socket.id}] END`);
            io.in(roomId).emit("FROM_SERVER", {
              type: MEDIA_ACTIONS.NEXT_VIDEO,
              payload: queues[roomId] ? queues[roomId].shift() : null
            });
          }

          // Send the updated queue
          io.in(roomId).emit("FROM_SERVER", {
            type: MEDIA_ACTIONS.QUEUE_UPDATED,
            payload: queues[roomId]
          });
          break;
        case MEDIA_ACTIONS.ADD_TO_QUEUE:
          console.log(`[${socket.id}] ADD TO QUEUE ` + action.payload);
          if (!queues[roomId]) {
            queues[roomId] = [];
          }
          queues[roomId].push(action.payload);
          console.log(queues);
          io.in(roomId).emit("FROM_SERVER", {
            type: MEDIA_ACTIONS.QUEUE_UPDATED,
            payload: queues[roomId]
          });
          break;

        default:
          console.log(`${action.type} is not supported`);
      }

      lastAction = action.type;
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
          socket.broadcast
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
