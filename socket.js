module.exports = (app, io) => {
    // Listen for new socket connections
    io.sockets.on("connection", socket => {
        let roomId = "";
        let lastAction = "";
        console.log(`New connection: ${socket.id}`)

        // Listen for events emitted from clients
        socket.on("FROM_CLIENT", (action) => {
            // Check the action type
            switch (action.type) {
                case "ESTABLISH_CONNECTION":
                    socket.join(action.payload, () => {
                        console.log(`Joined room: ${action.payload}`);
                        roomId = action.payload;
                    })
                    break;
                case "PLAY":    
                    console.log("PLAY");
                    if (lastAction !== "PLAY") {
                        socket.broadcast.to(roomId).emit("FROM_SERVER", {type: "PLAY", payload: action.payload})
                    }
                    lastAction = "PLAY";
                    break;
                case "PAUSE":
                    console.log("PAUSE");
                    if (lastAction !== "PAUSE") {
                        socket.broadcast.to(roomId).emit("FROM_SERVER", {type: "PAUSE", payload: action.payload})
                    }
                    lastAction = "PAUSE";
                    break;
                default:
                    console.log("Case not handled");
            }
        })

        // Check for disconnections
        socket.on("disconnect", () => {
            console.log(`Disconnected: ${socket.id}`)
        })

    })
}