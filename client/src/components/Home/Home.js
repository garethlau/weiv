import React from "react";
import {
	Container,
	Form,
	Button,
	Columns,
	Content
} from "react-bulma-components";

const { Field, Label, Control, Input } = Form;

export default function Home({ code, onChange, enterRoom, createRoom }) {
	return (
		<Container>
			<Columns>
				<Columns.Column>
					<Content>
						<h1>Join A Room</h1>
					</Content>
					<Field>
						<Label>Room Code</Label>
						<Control>
							<Input placeholder="Code" value={code} onChange={onChange} />
						</Control>
					</Field>
					<Button onClick={enterRoom}>Enter</Button>
				</Columns.Column>
				<Columns.Column>
					<Content>
						<h1>Create a Room</h1>
						<Button onClick={createRoom}>Create Room</Button>
					</Content>
				</Columns.Column>
			</Columns>
		</Container>
	);
}
