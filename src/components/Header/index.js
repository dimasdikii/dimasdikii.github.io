import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <Fragment>
            <div className="header-area" id="headerArea">
                <div className="container h-100 d-flex align-items-center justify-content-between">
                    <div className="logo-wrapper"><a href="/"><img src="/img/dimasdiki.png" alt="" /></a></div>
                </div>
            </div>
            </Fragment>
        )
    }
}

export default withRouter(Header);