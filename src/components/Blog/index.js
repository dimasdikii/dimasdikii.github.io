import React from 'react';

const Blog = (props) => {
    return(
        <div className="col-6 col-md-4 col-lg-3">
            <div className="card blog-card">
                <div className="post-img"><img src={props.img} alt={props.judul} style={{width:400, height:250}} /></div>
                <div className="post-content">
                <div className="bg-shapes">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <div className="circle4"></div>
                </div>
                <a className="post-catagory d-block" href="#">{props.category}</a>
                <a className="post-title d-block" onClick={() => props.goDetail(props.id)}>{props.judul}</a>
                            
                <div className="post-meta d-flex align-items-center justify-content-between flex-wrap mb-3"><a href="#"><i className="lni lni-user"></i>Dimas Diki</a></div>
                <a className="btn btn-primary btn-sm read-more-btn" onClick={() => props.goDetail(props.id)}>Read More</a>
                </div>
            </div>
        </div>
    )
}

export default Blog;