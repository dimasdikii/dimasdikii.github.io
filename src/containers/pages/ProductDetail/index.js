import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import NumberFormat from 'react-number-format';

class ProductDetail extends Component{
    state = {
        products: {
            id: "",
            name: "",
            price: "",
            img: "",
            desc: "",
            category: "",
            status: ""
        }
    }

    handleOrder = () => {
        this.goOrder(this.state.products.id);
    }

    goOrder = (id) => {
        this.props.history.push(`/order/${id}`);
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
                }
            })
        })
    }

    render(){
        //check product status
        const status = this.state.products.status;
        const isReady = status === "IN STOCK";
        return(
            <Fragment>
            <Header />
            <p className="p-2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={this.state.products.img} style={{width:500}} />
            </p>
            <div className="product-description pb-3">
                <div className="product-title-meta-data bg-white mb-3 py-3">
                <div className="container d-flex justify-content-between">
                    <div className="p-title-price">
                        <h6 className="mb-1">{this.state.products.name}</h6>
                        <p className="mb-0">
                            <NumberFormat value={this.state.products.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                        </p>
                        <button disabled={!isReady} className="btn btn-danger mt-2" onClick={this.handleOrder}>Beli Sekarang</button>
                    </div>
                </div>
                </div>
                <div className="p-specification bg-white mb-3 py-3">
                <div className="container">
                    <h6>Deskripsi Produk</h6>
                    <div dangerouslySetInnerHTML={{__html: this.state.products.desc}} />
                </div>
                </div>
            </div>
            <Footer />
            </Fragment>
        )
    }
}

export default ProductDetail;