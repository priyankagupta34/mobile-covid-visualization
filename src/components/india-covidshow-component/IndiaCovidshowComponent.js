import React, { Component } from 'react'
import './IndiaCovidshowComponent.css'
import { Waypoint } from 'react-waypoint'
import LoaderComponent from '../loader-component/LoaderComponent';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';

export default class IndiaCovidshowComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completeDetailsOfRegion: ''
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
                completeDetailsOfRegion: this.props.findDetailsByCode('DL')
            })
        }
    }

    addAnimationToWayUp(id, anim) {
        const component = window.document.getElementById(id);
        component.classList.add(anim);
    }

    render() {
        const { stateInfoLoader } = this.props;
        const { completeDetailsOfRegion } = this.state;
        console.log(this.state)

        return (
            <div>


                {completeDetailsOfRegion !== '' && <>


                    <TitleIconComponent icon="flare" title={completeDetailsOfRegion.info3.state === 'Total' ?
                        'India' : completeDetailsOfRegion.info3.state} />
                    <div className="main_lastUpdt">
                        Last updated {this.props.convertDateToDate(completeDetailsOfRegion.info3.lastupdatedtime)}
                    </div>
                    <div className="icsc_qdvc">
                        <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'con2', 'wayupanimation1')}>
                            <div className="qdvc_ic clickConfirmedAnim" id="con2">
                                {
                                    stateInfoLoader && completeDetailsOfRegion !== '' ?
                                        <div>
                                            <div className="fontwt500">Confirmed</div>

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
                                            <div className="fontwt500">Active</div>

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
                                            <div className="fontwt500">Recovered</div>

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
                                            <div className="fontwt100">Deceased</div>

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
                                <div className="fontwt100">Population</div>
                                <div className="deceasedCo delta">
                                    <i className="material-icons material-icons-outlined fontSize2 anyCo">groups</i>
                                </div>
                                <div className="qvdc_nm">{completeDetailsOfRegion.info2.meta.population}</div>
                            </div>
                        </div>
                        <div className="qdvc_ic">
                            <div>
                                <div className="fontwt100">Total Tests</div>
                                <div className="deceasedCo delta">
                                    {completeDetailsOfRegion.info3.deltadeaths !== '0' &&
                                        <><i className="material-icons fontSize1 ">arrow_upward</i> 
                                        {completeDetailsOfRegion.info3.state === 'Total' ?completeDetailsOfRegion.info2.delta.tested.states.samples:
                                        completeDetailsOfRegion.info2.delta.tested.samples}
                                        </>
                                        }
                                </div>
                                {completeDetailsOfRegion.info3.state === 'Total' ? <div className="qvdc_nm">
                                 {completeDetailsOfRegion.info2.total.tested.states.samples}</div> :
                                    <div className="qvdc_nm"> {completeDetailsOfRegion.info2.total.tested.samples}</div>}
                            </div>
                        </div>
                    </div>}



                </>
                }
            </div>
        )
    }
}

