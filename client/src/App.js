import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import LandingPage from "./Components/LandingPage";
import CreateDog from "./Components/CreateDog";
import Detail from "./Components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dogs/:id" component={Detail} />
          <Route exact path="/create" component={CreateDog} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
