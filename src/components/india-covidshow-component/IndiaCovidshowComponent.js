import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import { BarChartServices } from '../../chart-services/BarChartServices';
import { CovidServices } from '../../services/CovidServices';
import { DataStructureServices } from '../../services/DataStructureServices';
import QuickTileViewStateDistrictComponent from '../quick-tile-view-state-district-component/QuickTileViewStateDistrictComponent';
import SearchDetailedComponent from '../search-detailed-component/SearchDetailedComponent';
import StateGridViewComponent from '../state-grid-view-component/StateGridViewComponent';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';
import './IndiaCovidshowComponent.css';

export default class IndiaCovidshowComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completeDetailsOfRegion: '',
            stateOrDistrictSelected: '',
            quickCompleteData: [],
            searchList: [],
            freshShow: false,
            nationOrDistrictName: 'India',
            selectedCode: 'TT',
            tile: 'confirmed',
            showtile: 'confirmed',
            timeWiseDataOfNationOrState: [],
            timeWiseDataOfDistrict: [],
            completeDetailsOfDistrict: { info1: '', info2: '' },
            placeType: '',
            placeSearch: '',
            sortType: {
                event: 'active',
                sorting: true
            },
            tableTitle: 'All States Info'
        }
    }
    componentDidMount() {
        this.setState(state => {
            this.creatingInfoListForQuickCompleteStateData();
        }, () => {
            this.getTimeWiseData();
        })


    }

    getTimeWiseData() {
        CovidServices.timeWiseDataOfDistrict(this.state.selectedCode)
            .then((result) => {
                let timewisedataofDistrict = [];
                let timewisedata = []
                if (typeof result.data[this.state.selectedCode] !== 'undefined') {
                    timewisedata = this.separateStateDistrictTimewiseInfo(result.data[this.state.selectedCode]);
                }
                if (typeof timewisedata === 'undefined' && timewisedata.length === 0) {
                    timewisedata = [];
                } else {
                    setTimeout(() => {
                        BarChartServices.creatingBarChart('cov_id_india', timewisedata, this.state.tile);
                    }, 20);
                }
                if (this.state.selectedCode !== 'TT') {
                    if (typeof result.data[this.state.selectedCode]['districts'][this.state.placeSearch] !== 'undefined') {
                        timewisedataofDistrict = this.separateStateDistrictTimewiseInfo(result.data[this.state.selectedCode]['districts'][this.state.placeSearch]);
                    } else {
                        timewisedataofDistrict = [];
                    }
                    if (typeof timewisedataofDistrict !== 'undefined' && timewisedataofDistrict.length !== 0) {
                        setTimeout(() => {
                            BarChartServices.creatingBarChart('cov_id_state', timewisedataofDistrict, this.state.tile);
                        }, 20);
                    } else {
                        timewisedataofDistrict = []
                    }
                }
                else {
                    timewisedataofDistrict = []
                }
                this.setState(state => {
                    state.timeWiseDataOfNationOrState = timewisedata;
                    state.timeWiseDataOfDistrict = timewisedataofDistrict;
                    return state;
                })
            }).catch((err) => {

            });
    }

    creatingBarChartSimply() {
        if (typeof this.state.timeWiseDataOfNationOrState !== 'undefined' && this.state.timeWiseDataOfNationOrState.length !== 0) {
            BarChartServices.creatingBarChart('cov_id_india', this.state.timeWiseDataOfNationOrState, this.state.tile);
        }
        if (this.state.placeType === 'district') {
            setTimeout(() => {
                if (typeof this.state.timeWiseDataOfDistrict !== 'undefined' && this.state.timeWiseDataOfDistrict.length !== 0) {
                    BarChartServices.creatingBarChart('cov_id_state', this.state.timeWiseDataOfDistrict, this.state.tile);
                }
            }, 0);
        }
    }

    separateStateDistrictTimewiseInfo(data) {
        console.log('data ', data)
        let stateInfoList = [];
        // if (this.state.selectedCode !== 'LD') {
        // if (typeof data[this.state.selectedCode].dates !== 'undefined') {
        const allDatesForStateKey = Object.keys(data['dates']);
        const allDates = data['dates'];
        for (let i = 0; i < allDatesForStateKey.length; i++) {
            let stateInfo = {};
            stateInfo.date = allDatesForStateKey[i];
            if (typeof allDates[allDatesForStateKey[i]].total !== 'undefined') {
                if (typeof allDates[allDatesForStateKey[i]].total.confirmed !== 'undefined') {
                    stateInfo.confirmed = allDates[allDatesForStateKey[i]].total.confirmed;
                } else {
                    stateInfo.confirmed = 0;
                }
                if (typeof allDates[allDatesForStateKey[i]].total.deceased !== 'undefined') {
                    stateInfo.deceased = allDates[allDatesForStateKey[i]].total.deceased;
                } else {
                    stateInfo.deceased = 0;
                }
                if (typeof allDates[allDatesForStateKey[i]].total.other !== 'undefined') {
                    stateInfo.other = allDates[allDatesForStateKey[i]].total.other;
                } else {
                    stateInfo.other = 0;
                }
                if (typeof allDates[allDatesForStateKey[i]].total.recovered !== 'undefined') {
                    stateInfo.recovered = allDates[allDatesForStateKey[i]].total.recovered;
                } else {
                    stateInfo.recovered = 0;
                }
                if (typeof allDates[allDatesForStateKey[i]].total.tested !== 'undefined') {
                    stateInfo.tested = allDates[allDatesForStateKey[i]].total.tested;
                } else {
                    stateInfo.tested = 0;
                }
            }
            else {
                stateInfo.confirmed = 0;
                stateInfo.deceased = 0;
                stateInfo.other = 0;
                stateInfo.recovered = 0;
                stateInfo.recovered = 0;
            }
            if (typeof allDates[allDatesForStateKey[i]].delta !== 'undefined') {
                // console.log('not undefined')
                if (typeof allDates[allDatesForStateKey[i]].delta.confirmed !== 'undefined') {
                    stateInfo.deltaconfirmed = allDates[allDatesForStateKey[i]].delta.confirmed;
                } else {
                    stateInfo.deltaconfirmed = 0;
                }
                if (typeof allDates[allDatesForStateKey[i]].delta.deceased !== 'undefined') {
                    stateInfo.deltadeceased = allDates[allDatesForStateKey[i]].delta.deceased;
                } else {
                    stateInfo.deltadeceased = 0;
                }
                if (typeof allDates[allDatesForStateKey[i]].delta.other !== 'undefined') {
                    stateInfo.deltaother = allDates[allDatesForStateKey[i]].delta.other;
                } else {
                    stateInfo.deltaother = 0;
                }
                if (typeof allDates[allDatesForStateKey[i]].delta.recovered !== 'undefined') {
                    stateInfo.deltarecovered = allDates[allDatesForStateKey[i]].delta.recovered;
                } else {
                    stateInfo.deltarecovered = 0;
                }
                if (typeof allDates[allDatesForStateKey[i]].delta.tested !== 'undefined') {
                    stateInfo.deltatested = allDates[allDatesForStateKey[i]].delta.tested;
                } else {
                    stateInfo.deltarecovered = 0;
                }
            } else {
                stateInfo.deltaconfirmed = 0;
                stateInfo.deltadeceased = 0;
                stateInfo.deltaother = 0;
                stateInfo.deltarecovered = 0;
                stateInfo.deltarecovered = 0;
            }

            stateInfoList.push(stateInfo);
        }
        // }

        // if (this.state.selectedCode !== 'TT' && this.state.selectedCode !== 'UN') {
        // }
        // }
        return stateInfoList;
    }

    componentDidUpdate(prev) {
        if (prev !== this.props) {
            this.creatingInfoListForQuickCompleteStateData();
        }
    }

    creatingInfoListForQuickCompleteStateData() {
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

            this.setState({
                ...this.state,
                quickCompleteData,
                placeType: '',
                completeDetailsOfRegion: this.props.findDetailsByCode('TT'),
                tableTitle: 'All States Info',
                nationOrDistrictName: 'India',
                freshShow: true,
                placeSearch: ''
            }, () => {
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        freshShow: false
                    })
                }, 10);
            })

        }
    }

    addAnimationToWayUp(id, anim, event) {
        setTimeout(() => {
            const component = window.document.getElementById(id);
            if (component !== null) {
                component.classList.add(anim);
            }
        }, 100);
    }


    filterStateDistrictHandler(words) {
        setTimeout(() => {
            const searchList = DataStructureServices.search(this.props.stateDistrictCodeList, 'search', words);
            this.setState(state => {
                state.searchList = [];
                state.searchList = searchList;
                return state;
            });
        }, 0);

    }

    clearNCloseSearch() {
        this.setState({
            ...this.state,
            searchList: []
        })
    }

    provideDataOfPlace(placek, event) {
        // console.log('placek ', placek)
        const place = placek;
        const completeDetailsOfRegion = this.props.findDetailsByCode(place.code);
        console.log('completeDetailsOfRegion ', completeDetailsOfRegion)
        let completeDetailsOfDistrict = { info1: '', info2: '', info3: '' };
        if (place.type === 'district') {
            if (typeof completeDetailsOfRegion.info1.districtData !== 'undefined' &&
                typeof completeDetailsOfRegion.info1.districtData[place.search] !== 'undefined') {
                completeDetailsOfDistrict.info1 = completeDetailsOfRegion.info1.districtData[place.search];
            }
            if (completeDetailsOfRegion.info2 !== '' && typeof completeDetailsOfRegion.info2.districts[place.search] !== 'undefined') {
                completeDetailsOfDistrict.info2 = completeDetailsOfRegion.info2.districts[place.search];
            }
            completeDetailsOfDistrict.info3 = place;
            completeDetailsOfDistrict.info3.lastupdatedtime = completeDetailsOfRegion.info3.lastupdatedtime;
        }

        let quickCompleteDataDistrict = [];
        const districtData = completeDetailsOfRegion.info1.districtData;
        const districtDataKeys = Object.keys(districtData);
        for (let i = 0; i < districtDataKeys.length; i++) {
            let detail = {};
            detail.active = districtData[districtDataKeys[i]].active;
            detail.confirmed = districtData[districtDataKeys[i]].confirmed;
            detail.deaths = districtData[districtDataKeys[i]].deceased;
            detail.recovered = districtData[districtDataKeys[i]].recovered;
            detail.deltaconfirmed = districtData[districtDataKeys[i]].delta.confirmed;
            detail.deltadeaths = districtData[districtDataKeys[i]].delta.deaths;
            detail.deltarecovered = districtData[districtDataKeys[i]].delta.recovered;
            detail.state = districtDataKeys[i];
            detail.migratedother = "N/A";
            if (typeof completeDetailsOfRegion.info2.districts !== 'undefined' && typeof completeDetailsOfRegion.info2.districts[districtDataKeys[i]] !== 'undefined' && typeof completeDetailsOfRegion.info2.districts[districtDataKeys[i]].meta !== 'undefined') {
                detail.population = completeDetailsOfRegion.info2.districts[districtDataKeys[i]].meta.population;
            } else {
                detail.population = 'N/A'
            }
            quickCompleteDataDistrict.push(detail)
        }

        const sorting = DataStructureServices.mergeSort(quickCompleteDataDistrict, this.state.sortType.event).reverse();

        this.setState((state) => {
            // ...this.state,
            // completeDetailsOfRegion,
            // completeDetailsOfDistrict,
            // quickCompleteData: sorting,
            // selectedCode: place.code,
            // searchList: [],
            // placeType: place.type,
            // placeSearch: place.search,
            // freshShow: true,
            // nationOrDistrictName: place.state,
            // tableTitle: `Districts of ${place.state}`,

            state.completeDetailsOfRegion = completeDetailsOfRegion;
            state.completeDetailsOfDistrict = completeDetailsOfDistrict;
            state.quickCompleteData = sorting;
            state.selectedCode = place.code;
            state.searchList = [];
            state.placeType = place.type;
            state.placeSearch = place.search;
            state.freshShow = true;
            state.nationOrDistrictName = place.state;
            state.tableTitle = `Districts of ${place.state}`;
            return state;

        }, () => {
            this.setState({
                freshShow: false,
            }, () => {
                this.getTimeWiseData();
            })
        });


        // CovidServices.timeWiseDataOfDistrict(this.state.selectedCode)
        //     .then((result) => {
        //         setTimeout(() => {
        //             this.setState({
        //                 ...this.state,
        //                 freshShow: false,
        //                 timeWiseDataOfNationOrState: result.data
        //             })


        //         }, 10);
        //     }).catch((err) => {

        //     })

    }


    sortData(type, event) {
        const types = type;
        for (let i = 0; i < this.state.quickCompleteData.length; i++) {
            const id = document.getElementById(this.state.quickCompleteData[i].state);
            if (id !== null) {
                id.classList.add('flipItOver');
            }
        }
        setTimeout(() => {

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
            setTimeout(() => {
                for (let i = 0; i < this.state.quickCompleteData.length; i++) {
                    const id = document.getElementById(this.state.quickCompleteData[i].state);
                    if (id !== null) {
                        id.classList.remove('flipItOver');
                    }
                }

            }, 780);


        }, 10);
    }

    backToIndiaInfo() {
        this.setState(state => {
            this.provideDataOfPlace.bind(this, { code: 'TT', type: '', });
            state.searchList = [];
            return state;
        }, () => {
            this.creatingInfoListForQuickCompleteStateData();
        })
    }

    backgroundClickForTile(tile, event) {
        this.setState({
            ...this.state,
            tile
        }, () => {
            if (tile !== 'active') {
                this.setState({
                    ...this.state,
                    showtile: tile
                })
                this.creatingBarChartSimply();
            }
        })
    }




    render() {
        const { stateInfoLoader } = this.props;
        const { completeDetailsOfRegion, searchList, freshShow, selectedCode, placeType, quickCompleteData, sortType,
            completeDetailsOfDistrict, tableTitle, tile, showtile, nationOrDistrictName, placeSearch,
            timeWiseDataOfNationOrState, timeWiseDataOfDistrict } = this.state;

        return (
            <div>

                {selectedCode !== 'TT' && <div className="flexCenterX centered">
                    <button className="inLakhCrore" onClick={this.backToIndiaInfo.bind(this)}>
                        <i className="material-icons  pointInd material-icons-outlined">replay</i>
                    India's Collective Info</button>
                </div>}

                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'search', 'wayupanimation')}>
                    <div id="search">
                        <TitleIconComponent icon="search" title="Search" />
                        <div className="main_lastUpdt">
                            Search Any State or District
                        </div>
                        <SearchDetailedComponent
                            filterStateDistrictHandler={this.filterStateDistrictHandler.bind(this)}
                            clearNCloseSearch={this.clearNCloseSearch.bind(this)}
                            provideDataOfPlace={this.provideDataOfPlace.bind(this)}
                            searchList={searchList}
                        />
                    </div>
                </Waypoint>



                {!freshShow && placeType === 'district' && <div className="displayjoe backgroundDistInfo">
                    {(completeDetailsOfDistrict.info1 !== '' && completeDetailsOfDistrict.info2 !== '') &&
                        <>
                            <div id="swooshTile">
                                <QuickTileViewStateDistrictComponent
                                    title={"games"}
                                    stateInfoLoader={stateInfoLoader}
                                    tile={tile}
                                    completeDetailsOfRegion={completeDetailsOfDistrict}
                                    state={completeDetailsOfDistrict.info3.place}
                                    deltaconfirmed={completeDetailsOfDistrict.info1.delta.confirmed}
                                    active={completeDetailsOfDistrict.info1.active}
                                    deltarecovered={completeDetailsOfDistrict.info1.delta.recovered}
                                    recovered={completeDetailsOfDistrict.info1.recovered}
                                    confirmed={completeDetailsOfDistrict.info1.confirmed}
                                    deltadeaths={completeDetailsOfDistrict.info1.delta.deceased}
                                    deaths={completeDetailsOfDistrict.info1.deceased}
                                    lastupdatedtime={completeDetailsOfDistrict.info3.lastupdatedtime}
                                    convertDateToDate={this.props.convertDateToDate}
                                    addAnimationToWayUp={this.addAnimationToWayUp.bind(this)}
                                    backgroundClickForTile={this.backgroundClickForTile.bind(this)}
                                    transitionIdList={['difter1', 'difter2', 'difter3', 'difter4', 'difter5']}
                                />
                            </div>

                            {typeof timeWiseDataOfDistrict !== 'undefined' && timeWiseDataOfDistrict.length !== 0 &&
                                <>
                                    <div className="main_lastUpdt">
                                        Tap on the above tiles to change the graph.
                            </div>
                                    <div id="cov_id_state"></div>
                                    <div className="main_lastUpdt graphti2">
                                        {showtile} Covid19 situation in <font color="darkblue"><b>{placeSearch}</b></font>
                                    </div>
                                </>
                            }
                        </>
                    }</div>}


                {!freshShow && <div className="displayjoe">
                    {completeDetailsOfRegion !== '' &&
                        <>
                            <QuickTileViewStateDistrictComponent
                                title={"flare"}
                                stateInfoLoader={stateInfoLoader}
                                tile={tile}
                                completeDetailsOfRegion={completeDetailsOfRegion}
                                state={completeDetailsOfRegion.info3.state}
                                deltaconfirmed={completeDetailsOfRegion.info3.deltaconfirmed}
                                active={completeDetailsOfRegion.info3.active}
                                deltarecovered={completeDetailsOfRegion.info3.deltarecovered}
                                recovered={completeDetailsOfRegion.info3.recovered}
                                confirmed={completeDetailsOfRegion.info3.confirmed}
                                deltadeaths={completeDetailsOfRegion.info3.deltadeaths}
                                deaths={completeDetailsOfRegion.info3.deaths}
                                lastupdatedtime={completeDetailsOfRegion.info3.lastupdatedtime}
                                convertDateToDate={this.props.convertDateToDate}
                                addAnimationToWayUp={this.addAnimationToWayUp.bind(this)}
                                backgroundClickForTile={this.backgroundClickForTile.bind(this)}
                                transitionIdList={['difter6', 'difter7', 'difter8', 'difter9', 'difter10']}
                            />


                        </>

                    }</div>}
                {typeof timeWiseDataOfNationOrState !== 'undefined' && timeWiseDataOfNationOrState.length !== 0 &&
                    <>
                        <div className="main_lastUpdt">
                            Tap on the above tiles to change the graph.
                </div>
                        <div id="cov_id_india"></div>
                        <div className="main_lastUpdt graphti2">
                            {showtile} Covid19 situation in <font color="darkblue"><b>{nationOrDistrictName}</b></font>
                        </div>
                    </>
                }




                {/* <div id="quickgrphof7">
                    <div id="last7days">
                        <TitleIconComponent icon="local_activity" title={`Last 7 Days in ${nationOrDistrictName}`} />
                        <div className="main_lastUpdt">
                            Quick View on Last few days
                            </div>

                    </div>
                    <div id="cov_id_india"></div>
                </div> */}


                {!freshShow &&
                    <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'detsin', 'wayupanimation')}>
                        <div id="detsin">
                            <StateGridViewComponent
                                quickCompleteData={quickCompleteData}
                                sortType={sortType}
                                placeType={placeType}
                                sortData={this.sortData.bind(this)}
                                title={tableTitle} icon="equalizer" />
                        </div>
                    </Waypoint>}
                {/* 
                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'indiagrs', 'wayupanimation4')}>
                    <div id="indiagrs"> */}
                {/* <IndiaQuickGraphsComponent addAnimationToWayUp={this.addAnimationToWayUp.bind(this)} /> */}
                {/* </div>
                </Waypoint> */}

            </div>
        )
    }
}

