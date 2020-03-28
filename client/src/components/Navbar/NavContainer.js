import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function NavbarContainer() {
	const [active, setActive] = useState(false);
	const width = useWindowWidth();
	const history = useHistory();

	useEffect(() => {
		// Close the mobile menu if we go back to desktop screen width
		if (width > 900) {
			setActive(false);
		}
	}, [width]);

    function goto(destination) {
		history.push(destination);
	}

	function toggleMobileMenu() {
		setActive(!active);
	}

	return <Nav active={active} toggleMobileMenu={toggleMobileMenu} goto={goto}/>;
}
