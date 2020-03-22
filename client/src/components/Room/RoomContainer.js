import React, { useEffect } from "react";
import io from "socket.io-client";

// Import UI Component
import Room from "./Room";

// Create connection string
const connection =
	process.env.NODE_ENV === "product" ? "" : "http://localhost:5000";
// Create socket
const socket = io(connection);

export default function RoomContainer() {
    // Connect to room and listen for socket events
    useEffect(() => {
		socket.emit("FROM_CLIENT", {
			type: "ESTABLISH_CONNECTION",
			payload: "CODE"
		});
	}, []);
    
    // Return UI component
	return <Room />;
}
