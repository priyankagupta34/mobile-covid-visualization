import React, { Component } from 'react';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';
import './StateGridViewComponent.css';
import { LimitServices } from '../../services/LimitServices';
import { DataStructureServices } from '../../services/DataStructureServices';

export default class StateGridViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quickCompleteData: [],
            sortType: {
                event: 'active',
                sorting: true
            }
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
                        quickCompleteData[i]['active'] = Number(quickCompleteData[i]['active']);
                        quickCompleteData[i]['deaths'] = Number(quickCompleteData[i]['deaths']);
                        quickCompleteData[i]['confirmed'] = Number(quickCompleteData[i]['confirmed']);
                        quickCompleteData[i]['recovered'] = Number(quickCompleteData[i]['recovered']);
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


    sortData(type, event) {
        const types = type;
        /* If  state.sortType.sort is true its ascends or descend*/
        this.setState((state, props) => {
            state.sortType.event = types;
            const sorted = DataStructureServices.mergeSort(state.quickCompleteData, types);
            const sortedReverse = DataStructureServices.mergeSort(state.quickCompleteData, types).reverse();
            if (state.sortType.sorting) {
                state.quickCompleteData = sorted;
            }
            else {
                state.quickCompleteData = sortedReverse;
            }
            return state;


        }, () => {
            this.setState({
                ...this.state,
                sortType: {
                    ...this.state.sortType,
                    sorting: !this.state.sortType.sorting
                }
            })
        })
    }

    render() {
        // console.log('neutral', this.state)
        const { title, icon } = this.props;
        const { quickCompleteData, sortType } = this.state;
        return (
            <>
                <TitleIconComponent icon={icon} title={title} />
                <div className="main_lastUpdt">
                    Drag table columns to see all details
                </div>
                <div className="gridsContainer">

                    <div className="gridStyle">
                        <div className="gridBox mainGridHeader gridMain titleGridContainer" onClick={this.sortData.bind(this, 'state')}>
                            <div>
                                <div className="miniDelta">
                                    {sortType.event === 'state' &&
                                        <>
                                            {sortType.sorting ?
                                                <i className="material-icons fontSize1 subCo">filter_list</i> :
                                                <i className="material-icons fontSize1 rotated180 subCo">filter_list</i>
                                            }
                                        </>
                                    }
                                </div>
                            State
                        </div>
                        </div>
                        <div className="gridBox gridMain subTitlMin" onClick={this.sortData.bind(this, 'active')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'active' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 activeCo">filter_list</i> :
                                            <i className="material-icons fontSize1 rotated180 activeCo">filter_list</i>
                                        }
                                    </>
                                }
                            </div>
                            Active
                                </div>
                        </div>
                        <div className="gridBox gridMain subTitlMin " onClick={this.sortData.bind(this, 'confirmed')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'confirmed' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 confirmedCo">filter_list</i> :
                                            <i className="material-icons fontSize1 rotated180 confirmedCo">filter_list</i>
                                        }
                                    </>
                                }
                            </div>
                            Confirmed
                                </div>
                        </div>
                        <div className="gridBox gridMain  subTitlMin" onClick={this.sortData.bind(this, 'deaths')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'deaths' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 deceasedCo">filter_list</i> :
                                            <i className="material-icons fontSize1 rotated180 deceasedCo">filter_list</i>
                                        }
                                    </>
                                }
                            </div>
                            Deaths
                                </div>
                        </div>
                        <div className="gridBox gridMain  subTitlMin" onClick={this.sortData.bind(this, 'recovered')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'recovered' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 recoveredCo">filter_list</i> :
                                            <i className="material-icons fontSize1 rotated180 recoveredCo">filter_list</i>
                                        }
                                    </>
                                }
                            </div>
                            Recovered
                                </div>
                        </div>
                        <div className="gridBox gridMain  subTitlMin"> <div>
                            <div className="miniDelta"></div>
                            Others
                        </div>
                        </div>
                        <div className="gridBox gridMain titleGridContainer subTitlMin" onClick={this.sortData.bind(this, 'population')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'population' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 populationCo">filter_list</i> :
                                            <i className="material-icons fontSize1 rotated180 populationCo">filter_list</i>
                                        }
                                    </>
                                }
                            </div>
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
