import React, { useEffect } from "react";
import { Container, Navbar, Columns, Button} from "react-bulma-components";
import VideoPlayer from "../VideoPlayer";

export default function Room({
  
}) {

  return (
    <>
      <Navbar color="primary">
        <Navbar.Menu>
          <Navbar.Brand>
            <Navbar.Item renderAs="a" href="#">
              <img
                src="https://bulma.io/images/bulma-logo.png"
                alt="Bulma: a modern CSS framework based on Flexbox"
                width="112"
                height="28"
              />
            </Navbar.Item>
          </Navbar.Brand>
          <Navbar.Container>
            <Navbar.Item>Item 1</Navbar.Item>
            <Navbar.Item>Item 2</Navbar.Item>
          </Navbar.Container>
          <Navbar.Container position="end">
            <Navbar.Item href="#">At the end</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
      <Container>
        <Columns>
          <Columns.Column size={9}>
            <VideoPlayer url={"http://www.youtube.com/watch?v=ysz5S6PUM-U"} />
          </Columns.Column>
          <Columns.Column size={3}>
            <Button  color="primary">
              Ping
            </Button>

          </Columns.Column>
        </Columns>
      </Container>
    </>
  );
}
