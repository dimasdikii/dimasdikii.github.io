import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../../components/Header';

class NotFound extends Component{
    navHome = () => {
        this.props.history.push('/');
    }
    
    render(){
        return(
            <Fragment>
            <Header />
            <div className="container">
                <div className="offline-area-wrapper py-3 d-flex align-items-center justify-content-center">
                <div className="offline-text text-center">
                    <img className="mb-4 px-5" src="/img/error_404.png" style={{width:500}} alt="Not Found" />
                    <h5>Maaf!</h5>
                    <p>Halaman yang kamu cari tidak ditemukan!</p>
                    <a className="btn btn-primary" onClick={this.navHome}>Kembali ke Home</a>
                </div>
                </div>
            </div>
            </Fragment>
        )
    }
}

export default withRouter(NotFound);