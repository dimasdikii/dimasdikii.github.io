import React, { Component, Fragment } from 'react';
import Header from '../../../components/Header';
import Products from '../../../components/Products';
import Footer from '../../../components/Footer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Shop extends Component{
    state = {
        products: []
    }

    getProducts(){
        axios.get('https://handler.dimasdiki.my.id/aijuwan_api/api/products')
        .then((res) => {
            this.setState({
                products: res.data.data
            })
        })
    }

    componentDidMount(){
        this.getProducts();
    }
    
    handleDetail = (id) => {
        this.props.history.push(`/product/${id}`);
    }

    // navVirtual = () => {
    //     let category = "Virtual"
    //     this.props.history.push(`/cat/${category}`);
    //     window.location.reload();
    // }

    // navHosting = () => {
    //     let category = "Hosting"
    //     this.props.history.push(`/cat/${category}`);
    //     window.location.reload();
    // }

    // navJasa = () => {
    //     let category = "Jasa"
    //     this.props.history.push(`/cat/${category}`);
    //     window.location.reload();
    // }

    render(){
        return(
            <Fragment>
                <Header />
                {/* <div className="product-catagories-wrapper py-3">
                    <div className="container">
                        <div className="section-heading">
                            <h6 className="ml-1">Kategori Produk</h6>
                        </div>
                        <div className="product-catagory-wrap">
                            <div className="row g-3">
                                <div className="col-4" onClick={this.navVirtual}>
                                    <div className="card catagory-card">
                                    <div className="card-body"><a><i className="lni lni-world"></i><span>Virtual</span></a></div>
                                    </div>
                                </div>
                                <div className="col-4" onClick={this.navHosting}>
                                    <div className="card catagory-card">
                                    <div className="card-body"><a><i className="lni lni-cloud-network"></i><span>Hosting</span></a></div>
                                    </div>
                                </div>
                                <div className="col-4" onClick={this.navJasa}>
                                    <div className="card catagory-card">
                                    <div className="card-body"><a><i className="lni lni-code"></i><span>Jasa</span></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="top-products-area clearfix py-3">
                    <div className="container">
                        <div className="section-heading d-flex align-items-center justify-content-between">
                        </div>
                        <div className="row g-3">
                        {
                            this.state.products.map(products => {
                                return <Products key={products.id} id={products.id} name={products.name} price={products.price} category={products.category} status={products.status} img={"https://handler.dimasdiki.my.id/aijuwan_api/storage/app/public/"+products.img} goDetail={this.handleDetail} />
                            })
                        }
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}

export default withRouter(Shop);