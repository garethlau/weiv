import React from "react";
import YouTubePlayer from "react-player/lib/players/YouTube";
import css from "./VideoPlayer.module.scss";

export default function VideoPlayer({
	onReady,
	onStart,
	onPlay,
	onProgress,
	onDuration,
	onPause,
	onSeek,
	onEnded,
	onError,
  url,
  player,
  playing,
}) {
	return (
		<div className={css.playerWrapper}>
			<YouTubePlayer
      ref={player}
				className={css.reactPlayer}
				url={url}
				playing={playing}
				onProgress={onProgress}
				onReady={onReady}
				onStart={onStart}
				onPlay={onPlay}
				onDuration={onDuration}
				onPause={onPause}
				onSeek={onSeek}
				onEnded={onEnded}
				onError={onError}
				controls
				width="100%"
				height="100%"
				config={{
					youtube: {
						playerVars: {
							showInfo: 1
						}
					}
				}}
			/>
		</div>
	);
}
