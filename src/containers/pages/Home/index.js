import React, { Component, Fragment } from 'react';
import Header from '../../../components/Header';
import Blog from '../../../components/Blog';
import Footer from '../../../components/Footer';
import axios from 'axios';

class Home extends Component{
    state = {
        blogs: []
    }

    getBlogs(){
        const token = "minjucantikya";
      
        axios.post(`https://handler.dimasdiki.my.id/aijuwan_api/api/blogs`, { token })
            .then(res => {
                this.setState({
                    blogs: res.data.data
                })
                // console.log(this.state.blogs);
            })
    }

    handleDetail = (id) => {
        this.props.history.push(`/post/${id}`);
    }

    componentDidMount(){
        this.getBlogs();
    }

    render(){
        return(
            <Fragment>
                <Header />
                <div className="container mt-5 p-4">
                    <div className="row g-3">
                    {
                        this.state.blogs.map(blogs => {
                            return <Blog key={blogs.id} id={blogs.id} judul={blogs.judul} konten={blogs.konten} category={blogs.post_cat_id} img={"https://handler.dimasdiki.my.id/aijuwan_api/storage/app/public/"+blogs.img} goDetail={this.handleDetail} />
                        })
                    }
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}

export default Home;