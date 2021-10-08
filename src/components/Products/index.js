import React from "react";
import NumberFormat from 'react-number-format';

const Products = (props) => {
    return (
        <div className="col-6 col-md-4 col-lg-3">
            <div className="card top-product-card">
            <div className="card-body">
            <span className="badge badge-primary">{props.status}</span>
            <a className="product-thumbnail d-block" onClick={() => props.goDetail(props.id)}>
                <img className="mb-2" src={props.img} alt="" />
            </a>
            <a className="product-title d-block" onClick={() => props.goDetail(props.id)}>{props.name}</a>
            <p>{props.category}</p>
            <p className="mt-2">
                <NumberFormat value={props.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
            </p>
            </div>
            </div>
        </div>
    );
};

export default Products;