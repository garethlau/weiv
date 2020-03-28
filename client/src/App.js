import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";

// Import components
import Room from "./components/Room";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/r" component={Room} />
			</Switch>
		</Router>
	);
}

export default App;
