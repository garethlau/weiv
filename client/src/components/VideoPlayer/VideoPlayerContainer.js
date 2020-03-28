import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function VideoPlayerContainer({ url, socket }) {
	useEffect(() => {
		console.log(url);
	}, [url]);

	const player = useRef(null);
	const [playing, setPlaying] = useState(true);

	useEffect(() => {
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
