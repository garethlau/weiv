import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import useFormInput from "../../hooks/useFormInput";

// Import UI Component
import Room from "./Room";

// Create connection string
const connection =
	process.env.NODE_ENV === "product" ? "" : "http://localhost:5000";
// Create socket
const socket = io(connection);

export default function RoomContainer() {
	const [code, setCode] = useState("");

	// Get the code from the url
	useEffect(() => {
		console.log(window.location);
		setCode(window.location.pathname.split("/")[2]);
	}, [window.location]);

	// Connect to room and listen for socket events
	useEffect(() => {
		// Make sure we have a code to connect to
		if (code) {
			socket.emit("FROM_CLIENT", {
				type: "ESTABLISH_CONNECTION",
				payload: code
			});
		}
	}, [code, window.location.href]);

	useEffect(
		// Cleanup and disconnect from the room when this component unmounts
		() => () => {
			console.log("Room Container being Destroyed")
			socket.disconnect();
		},
		[]
	);
	// Return UI component
	return <Room socket={socket} />;
}
