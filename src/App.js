import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Maps from "./Maps";
import MIAHome from "./MIAHome";
import Charts from "./Charts";
import PageNotFound from "./PageNotFound";
import Aggregate from "./Aggregate";
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch >
          <Route exact path="/" component={Maps} />
          <Route exact path="/home" component={MIAHome} />
          <Route exact path="/chart" component={Charts} />
          <Route exact path="/aggregate" component={Aggregate} />

          <Route path="*" component={PageNotFound} />
        </Switch >
      </BrowserRouter>
    );
  }
}

export default App;
