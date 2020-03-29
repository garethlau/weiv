import React, { useState, useEffect } from "react";
import VideoQueue from "./VideoQueue";
import useFormInput from "../../hooks/useFormInput";

export default function VideoQueueContainer({ socket }) {
    const videoUrl = useFormInput();
    const [queue, setQueue] = useState([]);

    useEffect(() => {
		socket.on("FROM_SERVER", action => {
			switch (action.type) {
				case "QUEUE_UPDATED":
					setQueue(action.payload);
					break;
				default:
					console.log("Default not handled");
			}
		});
	}, []);

	function addToQueue() {
		// Check if the url is a valid youtube URL

		// Add to queue
		socket.emit("FROM_CLIENT", {
			type: "ADD_TO_QUEUE",
			payload: videoUrl.value
		});

		// Clear the text field
		videoUrl.clear();
	}
	return (
		<VideoQueue videoUrl={videoUrl} queue={queue} addToQueue={addToQueue} />
	);
}
