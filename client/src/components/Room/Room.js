import React, { useEffect } from "react";
import { Container, Navbar, Columns, Button, Panel} from "react-bulma-components";
import VideoPlayer from "../VideoPlayer";

export default function Room({
  socket
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
            <VideoPlayer socket={socket} url={"http://www.youtube.com/watch?v=ysz5S6PUM-U"} />
          </Columns.Column>
          <Columns.Column size={3}>
            <p class="panel-heading">
              Video Queue
            </p>
            <div class="panel-block">
              <p class="control has-icons-left">
              </p>
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

          </Columns.Column>
        </Columns>
      </Container>
    </>
  );
}
