import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button } from 'react-bulma-components/dist';


// Import components
import Room from "./components/Room";

function Home() {
  return (
      <div>Welcome to Weiv
        <Button color="primary">Join Room</Button>
        <Button color="primary">Create Room</Button>
        <input class="input is-info" type="text" placeholder="Info input">
        </input>
        </div>

    );
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
