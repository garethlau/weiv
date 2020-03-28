import React, { useEffect } from "react";
import { Container, Navbar, Columns, Button} from "react-bulma-components";
import VideoPlayer from "../VideoPlayer";

export default function Room({
  socket,
  videoUrl
}) {

  return (
      <Container>
        <Columns>
          <Columns.Column size={9}>
            <VideoPlayer socket={socket} url={videoUrl} />
          </Columns.Column>
          <Columns.Column size={3}>
            <Button  color="primary">
              Ping
            </Button>

          </Columns.Column>
        </Columns>
      </Container>
  );
}
