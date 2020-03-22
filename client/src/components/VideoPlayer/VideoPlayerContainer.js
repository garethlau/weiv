import React, { useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import useWindowWidth from "../../hooks/useWindowWidth";


export default function VideoPlayerContainer({
    url
}) {

useEffect(() => {
    console.log(url)
}, [url])
  function onReady(event) {
    // access to player in all event handlers via event.target
    console.log(event)
  }

  function onPlay(event) {
    console.log("Play");
  }

  function onPause(event) {
    console.log("Pause");
  }

  function onEnded(event) {
    console.log("End");
  }

  function onError(event) {
    console.log("Error");
    console.log(event)
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
        />
  );
}
