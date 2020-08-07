import React, { Component } from 'react';
import PackageJson from './../../../package.json';
import './HeaderComponent.css';
import { Link } from 'react-router-dom';
import { CovidServices } from '../../services/CovidServices';

export default class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            openNotificationPanel: false,
            notificationCompleteset: []
        }
    }

    componentDidMount() {
        this.getNotificationLogs();
    }

    getNotificationLogs() {

        CovidServices.getNotifications()
            .then(response => {
                console.log('response ', response.data)
                this.setState({
                    ...this.state,
                    notificationCompleteset: response.data
                })
            })
            .catch(error => {

            })
    }

    convertTimestampToEpochToDate(utcSeconds) {
        const epochStamp = new Date(0);
        const timestamp = epochStamp.setUTCSeconds(utcSeconds);
        return new Date(timestamp).toDateString();
    }

    convertTimestampToEpochToTime(utcSeconds) {
        const epochStamp = new Date(0);
        const timestamp = epochStamp.setUTCSeconds(utcSeconds);
        return new Date(timestamp).toLocaleTimeString();
    }

    openMenuForSm() {
        this.setState({
            ...this.state,
            openMenu: true
        });
    }

    openNotificationPanelHandler() {
        this.setState({
            ...this.state,
            openNotificationPanel: !this.state.openNotificationPanel
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
        const { openMenu, openNotificationPanel, notificationCompleteset } = this.state;
        const { loggedCountryName } = this.props;
        return (
            <div>
                <div className="hc1">
                    <i className="material-icons my_ic1" onClick={this.openMenuForSm.bind(this)} >menu</i>
                    <div>
                        <div className="notificationPoint">
                            <div className="hc8">
                                <div className="flex">
                                    <div>
                                        <div className="hc_cntry"> <i className="material-icons hc_ic">flare</i>{loggedCountryName}</div>
                                        <div className="hc_tle">{new Date().toDateString()}</div>
                                    </div>
                                    {!openNotificationPanel ? <i className="material-icons material-icons-outlined hc_ic reminbell"
                                        onClick={this.openNotificationPanelHandler.bind(this)} >notifications</i>
                                        :
                                        <i className="material-icons material-icons-outlined hc_ic reminbell"
                                            onClick={this.openNotificationPanelHandler.bind(this)} >notifications_off</i>
                                    }
                                </div>
                            </div>
                            <div className="righted">
                                <i className="material-icons spin_corona" >coronavirus</i>
                            </div>
                        </div>
                        {openNotificationPanel && <div className="notificationPanel">
                            {notificationCompleteset.reverse().map((item, index) => (
                                <div key={item.timestamp} className="notice">
                                    <div>{this.convertTimestampToEpochToDate(item.timestamp)}, {this.convertTimestampToEpochToTime(item.timestamp)}</div>
                                    <div className="noticeUpdate">{item.update}</div>
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>
                {openMenu && <div className="hc2 slideInFromLeft" id="hc1">
                    <div className="hc3 righted">
                        <i className="material-icons my_ic1" onClick={this.closeMenuForSm.bind(this)}>menu_open</i>
                    </div>
                    <div className="hc4">
                        <div>
                            <Link to="/india" >
                                <button className="btn1" onClick={this.closeMenuForSm.bind(this)}>Quick India View</button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/world" >
                                <button className="btn1" onClick={this.closeMenuForSm.bind(this)}>Quick World View</button>
                            </Link>
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
                            <i className="material-icons my_ic2">facebook</i>
                        </a>
                        <a href="tel:+917903365508">
                            <i className="material-icons my_ic2">call</i>
                        </a>
                        <a href="mailto:34priyankagupta@gmail.com">
                            <i className="material-icons my_ic2">email</i>
                        </a>
                    </div>
                </div>
                }
            </div>
        )
    }
}
