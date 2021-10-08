import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class PayNotif extends Component{

    state = {
        orders: []
    }

    getOrder(id){
      const token = "minjucantikya";

        axios.post(`https://handler.dimasdiki.my.id/aijuwan_api/api/order/get`, { id, token })
          .then((result) => {
            this.setState({
                orders: result.data.data[0]
            }, () => {
                // console.log("orders : ", this.state.orders);
                this.payNotif();
            })
            // console.log(result);
          })
          .catch((error) => {
            // console.log(error);
          });
    };

    payNotif(){
        let nomor = this.state.orders.buyer_phone;
        let msg = "Hai, *"+ this.state.orders.buyer_name +"*. Pembayaran untuk pesanan *"+ this.state.orders.item_name +"* sebesar *Rp "+ this.state.orders.item_price +"* sudah Kami terima. Kami akan menghubungi Kamu perihal update dari pesananmu. Terimakasih -DimasDiki";

        const headers = {
            'Content-Type': 'text/plain'
        };
        axios.post('https://handler.dimasdiki.my.id/wasap/api/send.php?key=e862960aa92c1d9936958d07ed7b080521d534bd', { nomor, msg }, { headers })
        .then((res) => {
            // console.log("notif : ", res);
        }, (err) => {
            // console.log(err);
        });
    }

    componentDidMount(){
        let id = this.props.match.params.orderID;
        this.getOrder(id);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render(){
        return(
            <p>Payment notif sent!</p>
        )
    }
}

export default withRouter(PayNotif);