import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";

// Import components
import Room from "./components/Room";

function Home() {
  return <div>Welcome to Weiv</div>
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/r" component={Room} />
      </Switch>
    </Router>
  );
}

export default App;
