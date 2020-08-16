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

    sortData(type, event) {
        const types = type;
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
        const { title, icon, quickCompleteData, sortType, placeType } = this.props;
        return (
            <>
                <TitleIconComponent icon={icon} title={title} />
                <div className="main_lastUpdt">
                    Drag table columns. Also click headings to sort the table.
                </div>
                <div className="gridsContainer">

                    <div
                        className={placeType === 'district' ? 'gridStyle districtGridStyle' : 'gridStyle'}
                    >
                        <div className="gridBox mainGridHeader gridMain titleGridContainer"
                            onClick={() => this.props.sortData('state')}>
                            <div>
                                <div className="miniDelta">
                                    {sortType.event === 'state' &&
                                        <>
                                            {sortType.sorting ?
                                                <i className="material-icons fontSize1 fontwt600  subCo ">filter_list</i> :
                                                <i className="material-icons fontSize1 fontwt600  rotated180 subCo">filter_list</i>
                                            }
                                        </>
                                    }
                                </div>
                            State
                        </div>
                        </div>
                        <div className="gridBox gridMain subTitlMin" onClick={() => this.props.sortData('active')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'active' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 fontwt600  activeCo">filter_list</i> :
                                            <i className="material-icons fontSize1 fontwt600  rotated180 activeCo">filter_list</i>
                                        }
                                    </>
                                }
                            </div>
                            Active
                                </div>
                        </div>
                        <div className="gridBox gridMain subTitlMin " onClick={() => this.props.sortData('confirmed')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'confirmed' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 fontwt600  confirmedCo">filter_list</i> :
                                            <i className="material-icons fontSize1 fontwt600  rotated180 confirmedCo">filter_list</i>
                                        }
                                    </>
                                }
                            </div>
                            Confirmed
                                </div>
                        </div>
                        <div className="gridBox gridMain  subTitlMin" onClick={() => this.props.sortData('deaths')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'deaths' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 fontwt600  deceasedCo">filter_list</i> :
                                            <i className="material-icons fontSize1 fontwt600  rotated180 deceasedCo">filter_list</i>
                                        }
                                    </>
                                }
                            </div>
                            Deaths
                                </div>
                        </div>
                        <div className="gridBox gridMain  subTitlMin" onClick={() => this.props.sortData('recovered')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'recovered' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 fontwt600  recoveredCo">filter_list</i> :
                                            <i className="material-icons fontSize1 fontwt600  rotated180 recoveredCo">filter_list</i>
                                        }
                                    </>
                                }
                            </div>
                            Recovered
                                </div>
                        </div>
                        {placeType !== 'district' &&
                            <div className="gridBox gridMain  subTitlMin"> <div>
                                <div className="miniDelta"></div>
                            Others
                        </div>
                            </div>
                        }
                        <div className="gridBox gridMain titleGridContainer subTitlMin" onClick={() => this.props.sortData('population')}> <div>
                            <div className="miniDelta righted">
                                {sortType.event === 'population' &&
                                    <>
                                        {sortType.sorting ?
                                            <i className="material-icons fontSize1 fontwt600 populationCo">filter_list</i> :
                                            <i className="material-icons fontSize1 fontwt600  rotated180 populationCo">filter_list</i>
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

                            <div className="gridStyle righted" key={index}>
                                <div className="gridBox mainGridHeader gridMain titleGridContainer onlyState">
                                    <div id={item.state}>
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
                                            {!(item.deltaconfirmed === '0' || item.deltaconfirmed === 0)
                                                && typeof item.deltaconfirmed !== 'undefined' &&
                                                <><i className="material-icons fontSize1 ">arrow_upward</i>
                                                    {item.deltaconfirmed}</>}
                                        </div>
                                        {item.confirmed}
                                    </div>
                                </div>
                                <div className="gridBox">
                                    <div>
                                        <div className="deceasedCo miniDelta">
                                            {!(item.deltadeaths === '0' || item.deltadeaths === 0)
                                                && typeof item.deltadeaths !== 'undefined' &&
                                                <><i className="material-icons fontSize1 deceasedCo">arrow_upward</i>
                                                    {item.deltadeaths}</>}
                                        </div>
                                        {item.deaths}
                                    </div>
                                </div>
                                <div className="gridBox">
                                    <div>
                                        <div className="recoveredCo miniDelta">
                                            {!(item.deltarecovered === '0' || item.deltarecovered === 0)
                                                && typeof item.deltarecovered !== 'undefined' &&
                                                <><i className="material-icons fontSize1 recoveredCo">arrow_upward</i>
                                                    {item.deltarecovered}</>}
                                        </div>
                                        {item.recovered}
                                    </div>
                                </div>
                                {placeType !== 'district' && <div className="gridBox">
                                    <div>
                                        <div className=" miniDelta"></div>
                                        {item.migratedother}
                                    </div>
                                </div>}

                                <div className="gridBox titleGridContainer">
                                    <div>
                                        <div className=" miniDelta"></div>
                                        {LimitServices.inLakhsOrCrores(item.population)}
                                    </div>
                                </div>
                            </div>

                        ))



                    }


                </div>
            </>
        )

    }


}
