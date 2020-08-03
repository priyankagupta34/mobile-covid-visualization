import React, { Component } from 'react'
import './TitleIconComponent.css'

export default class TitleIconComponent extends Component {
    render() {
        const { icon, title } = this.props;
        return (
            <div className="flexCenterX">
                <div className="centered">
                    <div className="tic1">
                        <i className="material-icons  material-icons-outlined qdvc_in_ic">{icon}</i>
                    </div>
                    <div className="tic_ti">{title}</div>
                </div>
            </div>
        )
    }
}
