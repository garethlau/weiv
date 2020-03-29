import React from "react";
import { Navbar } from "react-bulma-components";

export default function Nav({ active, toggleMobileMenu, goto }) {
	return (
		<Navbar color="primary" active={active} fixed="top">
			<Navbar.Brand>
				<Navbar.Item renderAs="a" href="/">
					<strong>Weiv</strong>
				</Navbar.Item>
				<Navbar.Burger onClick={toggleMobileMenu} />
			</Navbar.Brand>
			<Navbar.Menu>
				<Navbar.Container position="end">
					<Navbar.Item onClick={() => goto("/about")}>About</Navbar.Item>
					<Navbar.Item renderAs="a" href="https://github.com/garethlau/weiv">Contribute</Navbar.Item>
				</Navbar.Container>
			</Navbar.Menu>
		</Navbar>
	);
}
