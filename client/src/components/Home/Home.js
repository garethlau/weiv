import React from "react";
import {
	Container,
	Form,
	Button,
	Columns,
	Content
} from "react-bulma-components";
import css from "./Home.module.scss";
import Nav from "../Nav";

const { Field, Label, Control, Input } = Form;

export default function Home({ code, onChange, enterRoom, createRoom }) {
	return (
		<div>
			<Nav />
			<div className={css.content}>
				<Columns
					variableGap={{
						mobile: 0,
						tablet: 0,
						desktop: 2,
						widescreen: 2,
						fullhd: 2
					}}
				>
					<Columns.Column size={6}>
						<Content>
							<h3 className={css.text}>Join</h3>
						</Content>
						<Field>
							<Control>
								<Input placeholder="Code" value={code} onChange={onChange} />
							</Control>
						</Field>
						<Button fullwidth color="primary" onClick={enterRoom}>
							Join Room
						</Button>
					</Columns.Column>
					<Columns.Column size={6}>
						<Content>
							<h3 className={css.text}>Create</h3>
						</Content>
						<Button fullwidth color="primary" onClick={createRoom}>
							Create Room
						</Button>
					</Columns.Column>
				</Columns>
			</div>
		</div>
	);
}
