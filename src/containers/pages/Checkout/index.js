import React, { Component, Fragment } from 'react';
import Snap from '../../../containers/pages/Checkout/snap';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Checkout extends Component{

    state = {
        orders: [],
        payment: []
    }

    getOrder(id){
      const token = "minjucantikya";

        axios.post(`https://handler.dimasdiki.my.id/aijuwan_api/api/order/get`, { id, token })
          .then((result) => {
            this.setState({
                orders: result.data.data[0]
            }, () => {
                // console.log("orders : ", this.state.orders);
                this.getPayment(this.state.orders.order_id);
            })
            // console.log(result);
          })
          .catch((error) => {
            // console.log(error);
          });
    };

    getPayment(id){
      const token = "minjucantikya";

      axios.post(`https://handler.dimasdiki.my.id/aijuwan_api/api/pay/get`, { id, token })
        .then((result) => {
          //action if success
          this.setState({
              payment: result.data.data[0]
          }, () => {
              // console.log("payment : ", this.state.payment);
              //if payment status 200 redirect thanks
              if(this.state.payment != null){
                const status = this.state.payment.status_code;
                const isPaid = status === 200;
        
                if (isPaid){
                  this.props.history.push(`/thanks/`+this.state.orders.order_id);
                }
              }
          })
        })
        .catch((error) => {
          // console.log(error);
        });
    };

    componentDidMount(){
        let id = this.props.match.params.orderID;
        this.getOrder(id);

        this.interval = setInterval(() => {
          this.getOrder(id);
        }, 10000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render(){
        return (
            <Fragment>
              <Header />
                <Snap orders={this.state.orders} />
              <Footer />
            </Fragment>
        );
    }
}

export default withRouter(Checkout);