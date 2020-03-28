import React from "react";
import { Container, Columns, Button } from "react-bulma-components";

import css from './Room.module.scss';

import VideoPlayer from "../VideoPlayer";
import Nav from "../Nav";

export default function Room({ socket, videoUrl }) {
	return (
		<div>
			<Nav />
      <Container className={css.container}>
				<Columns>
					<Columns.Column size={9}>
						<VideoPlayer socket={socket} url={videoUrl} />
					</Columns.Column>
					<Columns.Column size={3}>
						<Button color="primary">Ping</Button>
					</Columns.Column>
				</Columns>
			</Container>
		</div>
	);
}
