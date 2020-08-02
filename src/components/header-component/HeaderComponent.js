import React, { Component } from 'react';
import PackageJson from './../../../package.json';
import './HeaderComponent.css';

export default class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
        }
    }

    openMenuForSm() {
        this.setState({
            ...this.state,
            openMenu: true
        });

    }

    closeMenuForSm() {
        const id = window.document.getElementById('hc1');
        id.classList.add('slideOutFromLeft')
        setTimeout(() => {
            id.classList.remove('slideOutFromLeft');
            this.setState({
                ...this.state,
                openMenu: false
            })
        }, 490);

    }

    render() {
        const { openMenu } = this.state;
        const { loggedCountryName } = this.props;
        return (
            <div>
                <div className="hc1">
                    <i className="material-icons my_ic1" onClick={this.openMenuForSm.bind(this)} >menu</i>
                    <div className="hc8">
                    
                        <div className="hc_cntry"> <i className="material-icons hc_ic">flare</i>{loggedCountryName}</div>
                        <div className="hc_tle">{new Date().toDateString()}</div>

                    </div>
                </div>
                {openMenu && <div className="hc2 slideInFromLeft" id="hc1">
                    <div className="hc3 righted">
                        <i class="material-icons my_ic1" onClick={this.closeMenuForSm.bind(this)}>menu_open</i>
                    </div>
                    <div className="hc4">
                        <div>
                            {/* <Link to="/login" > */}
                            <button className="btn1" onClick={this.closeMenuForSm.bind(this)}>Top Fives</button>
                            {/* </Link> */}
                            <br />
                            {/* <Link to="/signup"> */}
                            <button className="btn1" onClick={this.closeMenuForSm.bind(this)}>Signup</button>
                            {/* </Link> */}
                            <br />
                            {/* <Link to="/contact"> */}
                            <button className="btn1" onClick={this.closeMenuForSm.bind(this)}>Contact</button>
                            {/* </Link> */}
                        </div>
                    </div>
                    <div className="hc5"></div>
                    <div className="hc6">
                        <small className="ver">VERSION: {PackageJson.version}</small>
                        <br ></br>
                        <small className="ver1">Made with <span role="img" aria-label="heart emoji"> &#10084;&#65039;</span> by</small>
                        <br ></br>
                        <small className="ver1">Priyanka</small>
                    </div>
                    <div className="hc7">
                        <a href="https://www.facebook.com/Priyannca" target="_blank" rel="noopener noreferrer" >
                            <i class="material-icons my_ic2">facebook</i>
                        </a>
                        <a href="tel:+917903365508">
                            <i class="material-icons my_ic2">call</i>
                        </a>
                        <a href="mailto:34priyankagupta@gmail.com">
                            <i class="material-icons my_ic2">email</i>
                        </a>
                    </div>
                </div>
                }
            </div>
        )
    }
}
