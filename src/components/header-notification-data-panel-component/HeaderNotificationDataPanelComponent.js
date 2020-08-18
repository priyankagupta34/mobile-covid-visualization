import React, { Component } from 'react'
import './HeaderNotificationDataPanelComponent.css'
import { Waypoint } from 'react-waypoint';
import LoaderComponent from '../loader-component/LoaderComponent';

export default class HeaderNotificationDataPanelComponent extends Component {
    render() {
        const { openNotificationPanel, notificationLoader, notificationCompleteset } = this.props;
        return (
            <div>
                {openNotificationPanel &&
                    <div className="notificationPanel" id="notificationPanel">
                        <div className="heading">
                            <b>Latest Information of Covid in India</b>
                        </div>
                        {!notificationLoader ?
                            <>
                                {notificationCompleteset.map((item, index) => (
                                    <Waypoint onEnter={()=>this.props.addAnimationToWayUp(item.timestamp)} key={item.timestamp} >
                                        <div className="notice" id={item.timestamp}>
                                            <div><font color="#e6acad">{this.props.convertTimestampToEpochToDate(item.timestamp)}</font></div>
                                            <div className="noticeUpdate">{item.update}</div>
                                        </div>
                                    </Waypoint>
                                ))}
                            </>
                            :
                            <div className="loadinging">
                                <LoaderComponent></LoaderComponent>
                            </div>
                        }
                    </div>}
            </div>
        )
    }
}
