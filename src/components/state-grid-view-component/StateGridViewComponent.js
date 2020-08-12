import React, { Component } from 'react';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';
import './StateGridViewComponent.css';
import { LimitServices } from '../../services/LimitServices';

export default class StateGridViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quickCompleteData: []
        }
    }
    componentDidMount() {
        if (typeof this.props.codeWiseQuick4Data.statewise !== 'undefined') {
            let quickCompleteData = this.props.codeWiseQuick4Data.statewise;

            this.setState({
                ...this.state,
                quickCompleteData
            })
        }
    }
    componentDidUpdate(prev) {
        if (prev !== this.props) {
            if (typeof this.props.codeWiseQuick4Data.statewise !== 'undefined') {
                let quickCompleteData = Object.assign([], this.props.codeWiseQuick4Data.statewise);
                for (let i = 0; i < quickCompleteData.length; i++) {

                    if (quickCompleteData[i].statecode === 'UN') {
                        quickCompleteData.splice(i, 1);
                    }
                    if (quickCompleteData[i].statecode === 'TT') {
                        quickCompleteData.splice(i, 1);
                    }
                    if (quickCompleteData[i].statecode === 'LD') {
                        quickCompleteData.splice(i, 1);
                    }
                }

                for (let i = 0; i < quickCompleteData.length; i++) {
                    if (typeof this.props.completeStateInfoWithDelta[quickCompleteData[i].statecode] !== 'undefined') {
                        quickCompleteData[i]['population'] = this.props.completeStateInfoWithDelta[quickCompleteData[i].statecode].meta.population;
                        quickCompleteData[i]['district'] = this.props.completeStateInfoWithDelta[quickCompleteData[i].statecode].districts;
                    }

                }
                console.log('quickCompleteData ', quickCompleteData)



                this.setState({
                    ...this.state,
                    quickCompleteData
                })

            }
        }
    }

    render() {
        console.log('v', this.props)
        const { title, icon } = this.props;
        const { quickCompleteData } = this.state;
        return (
            <>
                <TitleIconComponent icon={icon} title={title} />
                <div className="main_lastUpdt">
                    Drag table columns to see all details
                </div>
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
                        <div className="gridBox gridMain titleGridContainer">
                            Population
                        </div>
                    </div>

                    {quickCompleteData.length !== 0 &&



                        quickCompleteData.map((item, index) => (
                            <>
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
                                    <div className="gridBox titleGridContainer">
                                        {LimitServices.inLakhsOrCrores(item.population)}
                                    </div>
                                </div>
                            </>
                        ))



                    }


                </div>
            </>
        )

    }


}
