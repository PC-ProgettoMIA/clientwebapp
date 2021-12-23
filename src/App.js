import React, { Component } from "react";
import { BrowserRouter, Switch , Route } from "react-router-dom";
import Maps2 from "./Maps";
import MIAHome from "./MIAHome";
import Charts from "./Charts";
import PageNotFound from "./PageNotFound";
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch >
          <Route exact path="/" component={Maps2} />
          <Route exact path="/home" component={MIAHome}/>
         <Route exact path= "/chart" component={Charts}/>
          <Route path="*" component={PageNotFound} />
        </Switch >
      </BrowserRouter>
    );
  }
}

export default App;
