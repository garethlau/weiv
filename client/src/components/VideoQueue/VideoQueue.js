import React from "react";
import { Form, Button, Content } from "react-bulma-components";
const { Field, Control, Input } = Form;

export default function VideoQueue({ queue, addToQueue, videoUrl }) {
	function renderQueue() {
        if (!queue || queue.length === 0) return null;
        return queue.map(url => (
			<a class="panel-block">
				<span class="panel-icon">
					<i class="fas fa-music"></i>
				</span>
				{url}
			</a>
		));
	}

	return (
		<div>
			<p class="panel-heading">Video Queue</p>
            {renderQueue()}
			<Field>
				<Control>
					<Input
						placeholder="Youtube URL"
						value={videoUrl.value}
						onChange={videoUrl.onChange}
					/>
				</Control>
				<Button fullwidth onClick={addToQueue} color="primary">
					Add to Queue
				</Button>
			</Field>
		</div>
	);
}
