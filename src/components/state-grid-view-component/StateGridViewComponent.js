import React, { Component } from 'react'
import './StateGridViewComponent.css'
import TitleIconComponent from '../title-icon-component/TitleIconComponent'

export default class StateGridViewComponent extends Component {
    render() {
        console.log('v', this.props)
        const { codeWiseQuick4Data, title, icon } = this.props;
        return (
            <>
                <TitleIconComponent icon={icon} title={title} />
                <div className="gridsContainer">

                    <div className="gridStyle">
                        <div className="gridBox mainGridHeader gridMain titleGridContainer">
                            State
                                </div>
                        <div className="gridBox gridMain ">
                            Active
                                </div>
                        <div className="gridBox gridMain ">
                            Confirmed
                                </div>
                        <div className="gridBox gridMain ">
                            Deaths
                                </div>
                        <div className="gridBox gridMain ">
                            Recovered
                                </div>
                        <div className="gridBox gridMain ">
                            Others
                        </div>
                    </div>

                    {typeof codeWiseQuick4Data.statewise !== 'undefined' &&



                        this.props.codeWiseQuick4Data.statewise.map((item, index) => (
                            <div className="gridStyle" key={index}>
                                <div className="gridBox mainGridHeader gridMain titleGridContainer">
                                    {item.state}
                                </div>
                                <div className="gridBox">
                                    {item.active}
                                </div>
                                <div className="gridBox">
                                    {item.confirmed}
                                </div>
                                <div className="gridBox">
                                    {item.deaths}
                                </div>
                                <div className="gridBox">
                                    {item.recovered}
                                </div>
                                <div className="gridBox">
                                    {item.migratedother}
                                </div>

                            </div>))



                    }


                </div>
            </>
        )

    }


}
