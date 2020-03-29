import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";

export default function VideoPlayerContainer({  socket }) {

	const player = useRef(null);
	const [playing, setPlaying] = useState(true);
	const defaultUrl ="http://www.youtube.com/watch?v=ysz5S6PUM-U" 
	const [url, setUrl] = useState(defaultUrl);

	useEffect(() => {
		// Check if the vide player object is still rendered
		socket.on("FROM_SERVER", action => {
			switch (action.type) {
				case "PLAY":
					console.log("Received play message");
					player.current.seekTo(action.payload, "seconds");
					setPlaying(true);
					break;
				case "PAUSE":
					console.log("Received pause message");
					player.current.seekTo(action.payload, "seconds");
					setPlaying(false);
					break;
				case "NEXT_VIDEO":
					if (action.payload === undefined || action.payload === null) {
						setUrl(defaultUrl);
					}
					else {
						setUrl(action.payload);
					}
					setPlaying(true);
				break;
				default:
					console.log("Not handled");
			}
		});
	}, []);

	function onReady(event) {
		// access to player in all event handlers via event.target
		console.log(event);
	}

	function onPlay(event) {
		console.log("Play");

		if (!playing) {
			let currentTime = player.current.getCurrentTime();
			socket.emit("FROM_CLIENT", { type: "PLAY", payload: currentTime });
		}
	}

	function onPause(event) {
		console.log("Pause");
		let currentTime = player.current.getCurrentTime();
		socket.emit("FROM_CLIENT", { type: "PAUSE", payload: currentTime });
	}

	function onEnded(event) {
		console.log("End");
		socket.emit("FROM_CLIENT", {type: "END"});
	}

	function onError(event) {
		console.log("Error");
		console.log(event);
	}

	function onSeek(event) {
		console.log(event);
	}

	function onProgress(event) {
		console.log(event);
	}

	function onDuration(event) {
		console.log(event);
	}

	return (
		<VideoPlayer
			url={url}
			onReady={onReady}
			onPlay={onPlay}
			onPause={onPause}
			onEnded={onEnded}
			onError={onError}
			onProgress={onProgress}
			onSeek={onSeek}
			onDuration={onDuration}
			onPlaybackRateChange={() => console.log("rate changed")}
			onPlaybackQualityChange={() => console.log("quality changed")}
			player={player}
			playing={playing}
		/>
	);
}
