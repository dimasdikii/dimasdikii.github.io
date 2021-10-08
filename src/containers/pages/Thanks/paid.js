import React, { Component, Fragment } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { withRouter } from 'react-router-dom';

class Paid extends Component{
    render(){
        return (
            <Fragment>
            <Header />
            <div className="container">
                <div className="checkout-wrapper-area py-3">
                    <div className="billing-information-card mb-3">
                        <div className="card user-data-card">
                        <div className="card-body text-center">
                            <img src="/img/payment_completed.png" width="250px" alt="payment-completed" />
                            <h6 className="text-center mt-3">Terima Kasih</h6>                                 
                            <p className="mt-1">
                                <strong>Pembayaranmu telah berhasil!</strong>
                                <br />
                                Team Kami akan menghubungi Kamu mengenai update dari pesananmu.
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

export default withRouter(Paid);