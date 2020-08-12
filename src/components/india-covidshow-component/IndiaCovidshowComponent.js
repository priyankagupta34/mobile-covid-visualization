import React, { Component } from 'react'
import './IndiaCovidshowComponent.css'
import { Waypoint } from 'react-waypoint'
import LoaderComponent from '../loader-component/LoaderComponent';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';
import SearchDetailedComponent from '../search-detailed-component/SearchDetailedComponent';
import { DataStructureServices } from '../../services/DataStructureServices';
import StateGridViewComponent from '../state-grid-view-component/StateGridViewComponent';

export default class IndiaCovidshowComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completeDetailsOfRegion: '',
            stateOrDistrictSelected: '',
            searchList: [],
            freshShow: false
        }
    }
    componentDidMount() {
        this.setState({
            ...this.state,
            completeDetailsOfRegion: this.props.findDetailsByCode('TT')
        })
    }

    componentDidUpdate(prev) {
        if (prev !== this.props) {
            this.setState({
                ...this.state,
                completeDetailsOfRegion: this.props.findDetailsByCode('TT')
            })
        }
    }

    addAnimationToWayUp(id, anim) {
        const component = window.document.getElementById(id);
        component.classList.add(anim);
    }

    filterStateDistrictHandler(words) {
        // setTimeout(() => {
        //     DataStructureServices.search(this.props.stateDistrictCodeList, 'search', words);
        // }, 0);
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

    provideDataOfPlace(place) {
        this.setState({
            ...this.state,
            completeDetailsOfRegion: this.props.findDetailsByCode(place.code),
            searchList: [],
            freshShow: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    freshShow: false
                })
            }, 10);
        })
    }

    render() {
        const { stateInfoLoader, codeWiseQuick4Data } = this.props;
        const { completeDetailsOfRegion, searchList, freshShow } = this.state;

        return (
            <div>

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
                {!freshShow && <>
                    {completeDetailsOfRegion !== '' && <>

                        <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'cvhiu1', 'wayupanimation')}>
                            <div id="cvhiu1">
                                <TitleIconComponent icon="flare" title={completeDetailsOfRegion.info3.state === 'Total' ?
                                    'India' : completeDetailsOfRegion.info3.state} />
                                <div className="main_lastUpdt">
                                    Last updated {this.props.convertDateToDate(completeDetailsOfRegion.info3.lastupdatedtime)}
                                </div>
                            </div>
                        </Waypoint>


                        <div className="icsc_qdvc">
                            <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'con2', 'wayupanimation1')}>
                                <div className="qdvc_ic clickConfirmedAnim" id="con2">
                                    {
                                        stateInfoLoader && completeDetailsOfRegion !== '' ?
                                            <div>
                                                <div className="quickTitle confirmedCo">Confirmed</div>

                                                <div className="confirmedCo delta">
                                                    {completeDetailsOfRegion.info3.deltaconfirmed !== '0' &&
                                                        <><i className="material-icons  fontSize1 ">arrow_upward</i>
                                                            {completeDetailsOfRegion.info3.deltaconfirmed}</>}
                                                </div>

                                                <div className="qvdc_nm">{completeDetailsOfRegion.info3.confirmed}</div>
                                            </div> :
                                            <LoaderComponent />}

                                </div>
                            </Waypoint>
                            <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'act2', 'wayupanimation2')}>
                                <div className="qdvc_ic" id="act2">

                                    {
                                        stateInfoLoader && completeDetailsOfRegion !== '' ?
                                            <div>
                                                <div className="quickTitle activeCo">Active</div>

                                                <div className="activeCo delta">
                                                    {/* {completeDetailsOfRegion.info3.deltaactive !== 0 &&<>
                                                <i className="material-icons fontSize1">arrow_upward</i> {completeDetailsOfRegion.info3.deltaactive}</>} */}
                                                </div>

                                                <div className="qvdc_nm">{completeDetailsOfRegion.info3.active}</div>
                                            </div> :
                                            <LoaderComponent />}


                                </div>
                            </Waypoint>
                            <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'rec2', 'wayupanimation3')}>
                                <div className="qdvc_ic" id="rec2">
                                    {
                                        stateInfoLoader && completeDetailsOfRegion !== '' ?
                                            <div>
                                                <div className="quickTitle recoveredCo">Recovered</div>

                                                <div className="recoveredCo delta">
                                                    {completeDetailsOfRegion.info3.deltarecovered !== '0' &&
                                                        <><i className="material-icons fontSize1">arrow_upward</i>
                                                            {completeDetailsOfRegion.info3.deltarecovered}</>}
                                                </div>

                                                <div className="qvdc_nm">{completeDetailsOfRegion.info3.recovered}</div>
                                            </div> :
                                            <LoaderComponent />}


                                </div>
                            </Waypoint>
                            <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'dea2', 'wayupanimation4')}>
                                <div className="qdvc_ic" id="dea2">
                                    {
                                        stateInfoLoader && completeDetailsOfRegion !== '' ?
                                            <div>
                                                <div className="quickTitle deceasedCo">Deceased</div>

                                                <div className="deceasedCo delta">
                                                    {completeDetailsOfRegion.info3.deltadeaths !== '0' &&
                                                        <><i className="material-icons fontSize1 ">arrow_upward</i>
                                                            {completeDetailsOfRegion.info3.deltadeaths}</>}
                                                </div>

                                                <div className="qvdc_nm">{completeDetailsOfRegion.info3.deaths}</div>
                                            </div> :
                                            <LoaderComponent />}
                                </div>
                            </Waypoint>
                        </div>

                        {completeDetailsOfRegion.info2 !== '' && <div className="metaPop">
                            <div className="qdvc_ic">
                                <div>
                                    <div className="quickTitle subCo">Population</div>
                                    <div className="deceasedCo delta">
                                        <i className="material-icons material-icons-outlined 2 anyCo">groups</i>
                                    </div>
                                    {typeof completeDetailsOfRegion.info2 !== undefined &&
                                        <div className="qvdc_nm">{completeDetailsOfRegion.info2.meta.population}</div>
                                    }
                                </div>
                            </div>
                            <div className="qdvc_ic">
                                <div>
                                    <div className="quickTitle subCo">Total Tests</div>
                                    <div className="deceasedCo delta">
                                        {completeDetailsOfRegion.info3.deltadeaths !== '0' &&
                                            <><i className="material-icons fontSize1 ">arrow_upward</i>


                                                {completeDetailsOfRegion.info3.state === 'Total' ?
                                                    completeDetailsOfRegion.info2.delta.tested.states.samples :
                                                    <>
                                                        {typeof completeDetailsOfRegion.info2 !== undefined && typeof completeDetailsOfRegion.info2.delta !== undefined && <>
                                                            {completeDetailsOfRegion.info2.delta.tested.samples}
                                                        </>}
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                    {typeof completeDetailsOfRegion.info2.total.tested !== undefined && <>{completeDetailsOfRegion.info3.state === 'Total' ? <div className="qvdc_nm">
                                        {completeDetailsOfRegion.info2.total.tested.states.samples}</div> :

                                        <div className="qvdc_nm">
                                            {completeDetailsOfRegion.info2.total.tested.samples}
                                        </div>}
                                    </>}
                                </div>
                            </div>
                        </div>}



                    </>
                    }</>}

                <div>
                    <StateGridViewComponent codeWiseQuick4Data={codeWiseQuick4Data} title="All States Info" icon="equalizer"/>
                </div>

            </div>
        )
    }
}

