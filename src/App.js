import React from "react";
import "./App.css";
import Home from "./Homepage.js"
import { Route, Link, Switch } from 'react-router-dom';
import Pizza from "./Pizza.js"

const App = () => {
  return (
    <div className="App">
      <nav>
        <h1>Lambda Eats</h1>
      
        <div className="nav-links">
          <Link to="/">Home</Link>
          <br></br>
          {/* <Link to="/Form">Form</Link>  */}
        </div>
      </nav>
      <Switch>
        <Route path="/Pizza" component={Pizza} />
        <Route  path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default App;
