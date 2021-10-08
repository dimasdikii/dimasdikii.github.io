import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import NumberFormat from 'react-number-format';

const Snap = (props) => {
    const [snapCheckoutToken, setSnapCheckoutToken] = useState("");
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const myScript = document.createElement("script");
        myScript.setAttribute(
          "src",
          "https://app.midtrans.com/snap/snap.js"
        );
        myScript.setAttribute(
          "data-client-key",
          "Mid-client-ip7Mow1HiVz30H_W"
        );
        document.head.appendChild(myScript);
      }
    }, []);
  
    useEffect(() => {
      if (snapCheckoutToken && typeof window !== "undefined") {
        window.snap.pay(snapCheckoutToken, {
          onSuccess: function (result) {

            // setTimeout(function() {
            //   let orderid = result.order_id;
            //   props.history.push(`/thanks/`+orderid);
            // }.bind(this), 3000)

            // console.log("onsuccess", result);
          },
          // Optional
          onPending: function (result) {
            // console.log("onPending", result);
          },
          // Optional
          onError: function (result) {
            // console.log("oneerror", result);
          },
        });
      }
    }, [snapCheckoutToken]);
  
    const handleOrderButton = (id) => {
      let snapToken = props.orders.snapToken;
      setSnapCheckoutToken(snapToken);
    };

    //check snap token
    const token = props.orders.snapToken;
    const isReady = token != null;
  
    return (
        <Fragment>
        <div className="container">
            <div className="checkout-wrapper-area py-3">
                <div className="billing-information-card mb-3">
                    <div className="card billing-information-title-card bg-primary">
                    <div className="card-body">
                        <h6 className="text-center mb-0 text-white">Data Pembeli</h6>
                    </div>
                    </div>
                    <div className="card user-data-card">
                    <div className="card-body">                                   
                        <div className="single-profile-data d-flex align-items-center justify-content-between">
                            <div className="title d-flex align-items-center">
                                <span>Nama</span>
                            </div>
                            <div className="data-content">{props.orders.buyer_name}</div>
                        </div>
                        <div className="single-profile-data d-flex align-items-center justify-content-between">
                            <div className="title d-flex align-items-center">
                                <span>E-Mail</span>
                            </div>
                            <div className="data-content">{props.orders.buyer_email}</div>
                        </div>
                        <div className="single-profile-data d-flex align-items-center justify-content-between">
                            <div className="title d-flex align-items-center">
                                <span>No. WhatsApp</span>
                            </div>
                            <div className="data-content">{props.orders.buyer_phone}</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="billing-information-card mb-3">
                    <div className="card billing-information-title-card bg-primary">
                    <div className="card-body">
                        <h6 className="text-center mb-0 text-white">Detail Pesanan</h6>
                    </div>
                    </div>
                    <div className="card user-data-card">
                    <div className="card-body">                                   
                        <div className="single-profile-data d-flex align-items-center justify-content-between">
                            <div className="title d-flex align-items-center">
                                <span>Jenis</span>
                            </div>
                            <div className="data-content">{props.orders.item_name}</div>
                        </div>
                        <div className="single-profile-data d-flex align-items-center justify-content-between">
                            <div className="title d-flex align-items-center">
                                <span>Catatan</span>
                            </div>
                            <div className="data-content">{props.orders.catatan}</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="card cart-amount-area">
                    <div className="card-body d-flex align-items-center justify-content-between">
                    <h5 className="total-price mb-0">
                        <NumberFormat value={props.orders.item_price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                    </h5>
                    <button disabled={!isReady} className="btn btn-success" onClick={() => handleOrderButton()}>Bayar Sekarang</button>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
  };

export default withRouter(Snap);