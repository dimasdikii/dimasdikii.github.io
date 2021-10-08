import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../Home';
import BlogDetail from "../BlogDetail";
import Shop from "../Shop";
import ProductDetail from "../ProductDetail";
import Order from "../Order";
import Checkout from "../Checkout";
import Thanks from "../Thanks";
import PayNotif from "../../../components/PayNotif";
import NotFound from '../NotFound';

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/post/:postID" component={BlogDetail} />
              <Route exact path="/shop" component={Shop} />
              <Route path="/product/:productID" component={ProductDetail} />
              <Route path="/order/:productID" component={Order} />
              <Route path="/checkout/:orderID" component={Checkout} />
              <Route path="/thanks/:orderID" component={Thanks} />
              <Route path="/paynotif/:orderID" component={PayNotif} />
              <Route component={NotFound} />
            </Switch>
        </Router>
    );
  }
}

export default App;
