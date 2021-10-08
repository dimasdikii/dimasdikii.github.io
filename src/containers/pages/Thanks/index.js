import React, { Component, Fragment } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Paid from '../Thanks/paid';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Thanks extends Component{

    state = {
        orders: [],
        payment: [],
        notif: 0
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
            this.setNotif(this.state.orders.order_id);
            this.adminNotif();
            // console.log("notif : ", res);
        }, (err) => {
            // console.log(err);
        });
    }

    adminNotif(){
        let nomor = "087717088885";
        let no_buyer = this.state.orders.buyer_phone;
        let nomor_buyer = no_buyer.substring(1, 14);

        let msg = "[NEW ORDER] Telah diterima pembayaran sebesar *Rp"+ this.state.orders.item_price +"* dari https://wa.me/+62"+ nomor_buyer +" untuk pemesanan *"+ this.state.orders.item_name +"*.";
        //notif ke admin
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

    setNotif(id){
        const token = "minjucantikya";

        axios.post(`https://handler.dimasdiki.my.id/aijuwan_api/api/setnotif`, { id, token })
          .then((result) => {
            //action if success
            // console.log(result);
          })
          .catch((error) => {
            // console.log(error);
          });
    }

    getPayment(id){
        const token = "minjucantikya";  
  
        axios.post(`https://handler.dimasdiki.my.id/aijuwan_api/api/pay/get`, { id, token })
          .then((result) => {
            //action if success
            this.setState({
                payment: result.data.data[0]
            }, () => {
                // console.log("payment : ", this.state.payment);
                //if pay code 200 send notif
                if(this.state.payment != null && this.state.payment.paynotif === 0){
                    const status = this.state.payment.status_code;
                    const isPaid = status === 200;
            
                    if (isPaid){
                        this.getOrder(id);
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
        this.getPayment(id);

        this.interval = setInterval(() => {
            this.getPayment(id);
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        //check payment status
        if(this.state.payment != null){
            const status = this.state.payment.status_code;
            const isPaid = status === 200;
    
            if (isPaid) return <Paid />
        }

        return (
            <Fragment>
            <Header />
            <div className="container">
                <div className="checkout-wrapper-area py-3">
                    <div className="billing-information-card mb-3">
                        <div className="card user-data-card">
                        <div className="card-body text-center">
                            <img src="/img/payment_processing.png" width="250px" alt="payment-processing" />
                            <h6 className="text-center mt-3">Mohon Tunggu</h6>                                 
                            <p className="mt-1">
                                <strong>Pembayaranmu sedang Kami proses ..</strong>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </Fragment>
        );
    }
}

export default withRouter(Thanks);