import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import NumberFormat from 'react-number-format';

class Order extends Component{
    state = {
        products: {
            id: "",
            name: "",
            price: "",
            img: "",
            desc: "",
            category: "",
            status: ""
        },
        refID : "",
        buy: {
            id: "",
            price: "",
            name: "",
            phone: "",
            email: "",
            catatan: ""
        },
        order: {
            order_id: "",
            item_id: "",
            item_name: "",
            item_price: "",
            buyer_name: "",
            buyer_email: "",
            buyer_phone: "",
            catatan: ""
        }
    }

    handleFormChange = (e) => {
        let buyNew = {...this.state.buy};
        buyNew[e.target.name] = e.target.value;

        this.setState({
            buy: buyNew,
        }, () => {
            // console.log("Buy: ",this.state.buy);
        })
    }

    handlePay = () => {
        this.postOrder();
    }

    postOrder(){
        var crypto = require("crypto");
        var code = crypto.randomBytes(5).toString('hex');
        this.setState({
            refID: this.state.buy.phone+"-"+this.state.buy.id+"-"+code
        }, () => {
            this.setOrder();
        })
    }

    setOrder(){
        this.setState({
            order: {
                order_id: this.state.refID,
                item_id: this.state.products.id,
                item_name: this.state.products.name,
                item_price: this.state.products.price,
                buyer_name: this.state.buy.name,
                buyer_email: this.state.buy.email,
                buyer_phone: this.state.buy.phone,
                catatan: this.state.buy.catatan,
                token: "minjucantikya"
            }
        }, () => {
            //post transaksi ke backend
            axios.post('https://handler.dimasdiki.my.id/aijuwan_api/api/order/post', this.state.order )
            .then((res) => {
                this.orderNotif();
                // console.log(res);
            }, (err) => {
                // console.log(err);
            });
            setTimeout(function() { //Start the timer
                this.goCheckout(this.state.order.order_id);
            }.bind(this), 3000)
        })
    }

    orderNotif(){
        let nomor = this.state.order.buyer_phone;
        let msg = "Hai, *"+ this.state.order.buyer_name +"*. Pesanan *"+ this.state.order.item_name +"* punya Kamu udah Kami terima, silakan lakukan pembayaran sebesar *Rp "+ this.state.order.item_price +"* melalui link berikut : https://dimasdiki.my.id/checkout/" + this.state.order.order_id + " Terimakasih -DimasDiki";

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

    goCheckout = (id) => {
        this.props.history.push(`/checkout/${id}`);
    }

    soldOut = () => {
        this.props.history.push("/shop");
    }
    
    componentDidMount(){
        let id = this.props.match.params.productID;
        axios.get(`https://handler.dimasdiki.my.id/aijuwan_api/api/product/${id}`)
        .then((res) => {
            let product = res.data.data;
            this.setState({
                products: {
                    id: product[0].id,
                    name: product[0].name,
                    price: product[0].price,
                    img: "https://handler.dimasdiki.my.id/aijuwan_api/storage/app/public/"+product[0].img,
                    desc: product[0].desc,
                    category: product[0].category,
                    status: product[0].status,
                },
                buy: {
                    id: product[0].id,
                    price: product[0].price,
                    name: "",
                    phone: "",
                    email: "",
                    catatan: ""
                }
            }, () => {
                // console.log(this.state.products.status);
                // console.log(this.state.buy);
                if(this.state.products.status === "SOLD OUT"){
                    this.soldOut();
                }
            })
        })
    }

    render(){
        //check buy input form
        const st_name = this.state.buy.name;
        const st_phone = this.state.buy.phone;
        const st_email = this.state.buy.email;
        const isFilled = st_name.length > 3 && st_phone.length > 10 && st_email.length > 5;
        return(
            <Fragment>
            <Header />
            <div className="container">
                <h6 className="pt-3 mb-0">Kamu akan membeli</h6>
                <div className="cart-wrapper-area py-3">
                    <div className="cart-table card mb-3">
                        <div className="table-responsive card-body">
                            <table className="table mb-0">
                                <tbody>
                                <tr>
                                    <td><img src={this.state.products.img} alt="" /></td>
                                    <td>
                                        <a href="single-product.html">
                                            {this.state.products.name}
                                            <span>
                                            <NumberFormat value={this.state.products.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <h6 className="mb-0">Silakan isi form pemesanan dengan data yang valid</h6>
                <div className="checkout-wrapper-area py-3">
                    <div className="credit-card-info-wrapper">
                        <div className="pay-credit-card-form">
                            <div className="mb-3">
                                <label htmlFor="name">Nama</label>
                                <input type="text" className="form-control" name="name" onChange={this.handleFormChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone">No. WhatsApp</label>
                                <input type="number" className="form-control" name="phone" onChange={this.handleFormChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">E-Mail</label>
                                <input type="email" className="form-control" name="email" onChange={this.handleFormChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="catatan">Catatan</label>
                                <textarea className="form-control" style={{height:100}} name="catatan" placeholder="Isi dengan custom username (office 365) / domain name (hosting) yang Kamu pilih" onChange={this.handleFormChange}></textarea>
                            </div>
                            <button disabled={!isFilled} className="btn btn-primary btn-lg w-100" onClick={this.handlePay}>Kirim Data Pemesanan</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </Fragment>
        )
    }
}

export default Order;