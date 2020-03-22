module.exports = (app, io) => {
    // Listen for new socket connections
    io.sockets.on("connection", socket => {
        console.log(`New connection: ${socket.id}`)
        
        // Listen for events emitted from clients
        socket.on("FROM_CLIENT", (action) => {
            // Check the action type
            switch (action.type) {
                case "ESTABLISH_CONNECTION":
                    socket.join(action.payload, () => {
                        console.log(`Joined room: ${action.payload}`);
                    })
            }
        })

        // Check for disconnections
        socket.on("disconnect", () => {
            console.log(`Disconnected: ${socket.id}`)
        })

    })
}