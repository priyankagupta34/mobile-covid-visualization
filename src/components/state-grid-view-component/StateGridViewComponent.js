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
                            <div>
                                <div className="miniDelta"></div>
                            State
                        </div>
                        </div>
                        <div className="gridBox gridMain subTitlMin"> <div>
                            <div className="miniDelta"></div>
                            Active
                                </div>
                        </div>
                        <div className="gridBox gridMain subTitlMin "> <div>
                            <div className="miniDelta"></div>
                            Confirmed
                                </div>
                        </div>
                        <div className="gridBox gridMain  subTitlMin"> <div>
                            <div className="miniDelta"></div>
                            Deaths
                                </div>
                        </div>
                        <div className="gridBox gridMain  subTitlMin"> <div>
                            <div className="miniDelta"></div>
                            Recovered
                                </div>
                        </div>
                        <div className="gridBox gridMain  subTitlMin"> <div>
                            <div className="miniDelta"></div>
                            Others
                        </div>
                        </div>
                        <div className="gridBox gridMain titleGridContainer subTitlMin"> <div>
                            <div className="miniDelta"></div>
                            Population
                        </div>
                        </div>
                    </div>

                    {quickCompleteData.length !== 0 &&



                        quickCompleteData.map((item, index) => (
                            <>
                                <div className="gridStyle righted" key={index}>
                                    <div className="gridBox mainGridHeader gridMain titleGridContainer onlyState">
                                        <div>
                                            {item.state}
                                        </div>
                                    </div>
                                    <div className="gridBox">
                                        <div>
                                            <div className="miniDelta"></div>
                                            {item.active}
                                        </div>
                                    </div>
                                    <div className="gridBox">
                                        <div>

                                            <div className="deceasedCo miniDelta confirmedCo">
                                                {item.deltaconfirmed !== '0' &&
                                                    <><i className="material-icons fontSize1 ">arrow_upward</i>
                                                        {item.deltaconfirmed}</>}
                                            </div>
                                            {item.confirmed}
                                        </div>
                                    </div>
                                    <div className="gridBox">
                                        <div>
                                            <div className="deceasedCo miniDelta">
                                                {item.deltadeaths !== '0' &&
                                                    <><i className="material-icons fontSize1 deceasedCo">arrow_upward</i>
                                                        {item.deltadeaths}</>}
                                            </div>
                                            {item.deaths}
                                        </div>
                                    </div>
                                    <div className="gridBox">
                                        <div>
                                            <div className="recoveredCo miniDelta">
                                                {item.deltarecovered !== '0' &&
                                                    <><i className="material-icons fontSize1 recoveredCo">arrow_upward</i>
                                                        {item.deltarecovered}</>}
                                            </div>
                                            {item.recovered}
                                        </div>
                                    </div>
                                    <div className="gridBox">
                                        <div>
                                            <div className=" miniDelta"></div>
                                            {item.migratedother}
                                        </div>
                                    </div>

                                    <div className="gridBox titleGridContainer">
                                        <div>
                                            <div className=" miniDelta"></div>
                                            {LimitServices.inLakhsOrCrores(item.population)}
                                        </div>
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
