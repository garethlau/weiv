import React from "react";
import css from "./Chat.module.scss";
import ScrollToBottom from "react-scroll-to-bottom";
import { Form, Button, Content  } from "react-bulma-components";
const { Field, Control, Input } = Form;

export default function Chat({
	logs,
	message,
	sendMessage
}) {
	function renderLogs() {
		return logs.map(log => {
			let date = new Date(log.date);

			return (
				<div className={css.messageContainer} key={log.date}>
					<Content>
						<p className={css.messageUsername}>
							{log.username} at {date.getHours()}:{date.getMinutes()}
						</p>
						<p className={css.messageContent}> {log.message}</p>
					</Content>
				</div>
			);
		});
	}

	return (
		<div className={css.container}>
			<ScrollToBottom className={css.logsContainer}>
				{renderLogs()}
			</ScrollToBottom>

			<div>
				<Field>
					<Control>
						<Input
							placeholder="Message"
							value={message.value}
							onChange={message.onChange}
						/>
						<Button onClick={sendMessage} fullwidth color="primary">
							Send Message
						</Button>
					</Control>
				</Field>
			</div>
		</div>
	);
}
