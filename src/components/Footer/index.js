import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';

class Footer extends Component{
    navHome = () => {
        this.props.history.push('/');
    }

    navShop = () => {
        this.props.history.push('/shop');
    }
    
    render(){
        return(
            <Fragment>
            <div className="footer-nav-area" id="footerNav">
                <div className="container h-100 px-0">
                    <div className="suha-footer-nav h-100">
                    <ul className="h-100 d-flex align-items-center justify-content-between pl-0">
                        <li>
                            <a onClick={this.navHome}>
                                <i className="lni lni-home"></i>Home
                            </a>
                        </li>
                        <li>
                            <a onClick={this.navShop}>
                                <i className="lni lni-shopping-basket"></i>Shop
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            </Fragment>
        )
    }
}

export default withRouter(Footer);