import React from "react";
import { Button, Panel } from "react-bulma-components";
import VideoPlayer from "../VideoPlayer";
import VideoQueue from "../VideoQueue";

import css from "./Room.module.scss";

import Nav from "../Nav";
import Chat from "../Chat";

export default function Room({
	socket,
}) {
	return (
		<div>
			<Nav />
			<div className={css.container}>
				<div className={css.queue}>
					<VideoQueue
            socket={socket}
					/>
				</div>
				<div className={css.videoPlayer}>
					<VideoPlayer socket={socket}  />
				</div>
				<div className={css.chat}>
					<Chat socket={socket} />
				</div>
			</div>
		</div>
	);
}
