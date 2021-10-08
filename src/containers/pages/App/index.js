import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
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
        // <Router>
        //     <Switch>
        //       <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
        //       <Route path={process.env.PUBLIC_URL + '/post/:postID'} component={BlogDetail} />
        //       <Route exact path={process.env.PUBLIC_URL + '/shop'} component={Shop} />
        //       <Route path={process.env.PUBLIC_URL + '/product/:productID'} component={ProductDetail} />
        //       <Route path={process.env.PUBLIC_URL + '/order/:productID'} component={Order} />
        //       <Route path={process.env.PUBLIC_URL + '/checkout/:orderID'} component={Checkout} />
        //       <Route path={process.env.PUBLIC_URL + '/thanks/:orderID'} component={Thanks} />
        //       <Route path={process.env.PUBLIC_URL + '/paynotif/:orderID'} component={PayNotif} />
        //       <Route component={NotFound} />
        //     </Switch>
        // </Router>
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Route render = {({ location }) => (
            <Switch location = { location }>
              <Route exact path='/' component={Home} />
              <Route path='/post/:postID' component={BlogDetail} />
              <Route exact path='/shop' component={Shop} />
              <Route path='/product/:productID' component={ProductDetail} />
              <Route path='/order/:productID' component={Order} />
              <Route path='/checkout/:orderID' component={Checkout} />
              <Route path='/thanks/:orderID' component={Thanks} />
              <Route path='/paynotif/:orderID' component={PayNotif} />
              <Route component={NotFound} />
            </Switch>
          )} />
        </HashRouter>
    );
  }
}

export default App;
