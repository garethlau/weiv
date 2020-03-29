import React, { useState, useEffect, useCallback, useRef } from "react";
import Chat from "./Chat";
import useFormInput from "../../hooks/useFormInput";

export default function ChatContainer({ socket }) {
	const [logs, setLogs] = useState([]);
	const message = useFormInput("");
	const username = useFormInput("Anonymous");
    
    useEffect(() => {
        // Listen for messages from the server
        socket.on("CHAT_ACTION_FROM_SERVER", action => {
			switch (action.type) {
				case "NEW_MESSAGE":
					console.log(action.payload);
					setLogs(oldLogs => [...oldLogs, action.payload]);
					break;
				default:
					console.log("Default not handled");
			}
		});
	}, []);

	function changeUsername() {
		socket.emit("CHAT_ACTION_FROM_CLIENT", {
			type: "CHANGE_USERNAME",
			payload: username.value
		});
	}

	function sendMessage() {
		// Don't do anything if there is no message
		if (message.value === "") return;

		if (message.value.charAt(0) === "/" && message.value.split("=")[1]) {
			let cmd = message.value.split("=")[0];
			if (cmd === "/username") {
				socket.emit("CHAT_ACTION_FROM_CLIENT", {
					type: "CHANGE_USERNAME",
					payload: message.value.split("=")[1]
				});
			} else {
				console.log("This is not a recognized command");
			}
		} else {
			// Send message to server
			socket.emit("CHAT_ACTION_FROM_CLIENT", {
				type: "NEW_MESSAGE",
				payload: message.value
			});
		}

		// Clear the message box
		message.clear();
	}

	function handleUserKeypress(event) {
		const { key, code } = event;
		if (code === "Enter") {
			sendMessage();
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handleUserKeypress);
		return () => window.removeEventListener("keydown", handleUserKeypress);
	}, [handleUserKeypress]);

	return (
		<Chat
			logs={logs}
			message={message}
			username={username}
			changeUsername={changeUsername}
			sendMessage={sendMessage}
		/>
	);
}
