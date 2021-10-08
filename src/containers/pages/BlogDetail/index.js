import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

class BlogDetail extends Component{
    state = {
        blogs: {
            id: "",
            judul: "",
            kategori: "",
            konten: "",
            img: "",
        }
    }
    
    componentDidMount(){
        let id = this.props.match.params.postID;
        let token = "minjucantikya";
        axios.post(`https://handler.dimasdiki.my.id/aijuwan_api/api/blog/get`, { id, token })
        .then((res) => {
            let blog = res.data.data;
            this.setState({
                blogs: {
                    id: blog[0].id,
                    judul: blog[0].judul,
                    kategori: blog[0].post_cat_id,
                    konten: blog[0].konten,
                    img: "https://handler.dimasdiki.my.id/aijuwan_api/storage/app/public/"+blog[0].img,
                }
            })
        })
    }

    render(){
        return(
            <Fragment>
            <Header />
            <p className="p-2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={this.state.blogs.img} style={{width:500}} />
            </p>
            <div className="product-description pb-3">
                <div className="product-title-meta-data bg-white mb-3 py-3">
                    <div className="container">
                        <h5 className="post-title">{this.state.blogs.judul}</h5>
                        <a className="post-catagory mb-3 d-block" href="#">{this.state.blogs.kategori}</a>
                    </div>
                </div>
                <div className="post-content bg-white py-3 mb-3">
                    <div className="container">
                        <div dangerouslySetInnerHTML={{__html: this.state.blogs.konten}} />
                    </div>
                </div>
            </div>
            <Footer />
            </Fragment>
        )
    }
}

export default BlogDetail;