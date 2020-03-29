import React from "react";
import {
	Button,
	Panel
} from "react-bulma-components";
import VideoPlayer from "../VideoPlayer";

import css from "./Room.module.scss";

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
				<div className={css.queue}>
					<p class="panel-heading">Video Queue</p>
					<div class="panel-block">
						<p class="control has-icons-left"></p>
					</div>
					<a class="panel-block is-active">
						<span class="panel-icon">
							<i class="fas fa-music"></i>
						</span>
						VideoOne
					</a>
					<a class="panel-block is-active">
						<span class="panel-icon">
							<i class="fas fa-music"></i>
						</span>
						VideoTwo
					</a>
					<a class="panel-block is-active">
						<span class="panel-icon">
							<i class="fas fa-music"></i>
						</span>
						VideoThree
					</a>
				</div>
			</div>
		</div>
	);
}
