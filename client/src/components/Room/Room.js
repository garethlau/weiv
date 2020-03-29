import React from "react";
import { Container, Columns, Button } from "react-bulma-components";

import css from "./Room.module.scss";

import VideoPlayer from "../VideoPlayer";
import Nav from "../Nav";
import Chat from "../Chat";

export default function Room({ socket, videoUrl }) {
	return (
		<div>
			<Nav />
			<div className={css.container}>
				<div className={css.videoPlayer}>
					<VideoPlayer socket={socket} url={videoUrl} />
				</div>
				<div className={css.chat}>
					<Chat socket={socket} />
				</div>
				<div className={css.queue}></div>
			</div>
		</div>
	);
}
