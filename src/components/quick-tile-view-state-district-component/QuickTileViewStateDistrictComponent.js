import React, { Component } from 'react'
import './QuickTileViewStateDistrictComponent.css'
import { Waypoint } from 'react-waypoint'
import LoaderComponent from '../loader-component/LoaderComponent'
import { LimitServices } from '../../services/LimitServices'
import TitleIconComponent from '../title-icon-component/TitleIconComponent'

export default class QuickTileViewStateDistrictComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tile: ''
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                ...this.state,
                tile: this.props.tile
            })
        }, 1600);
    }
    componentDidUpdate(prev) {
        if (this.props !== prev) {
            this.setState({
                ...this.state,
                tile: this.props.tile
            })
        }
    }

    openLink(link) {
        window.location.href = link;
    }
    render() {
        const { title, state, lastupdatedtime, stateInfoLoader, completeDetailsOfRegion, deltaconfirmed,
            confirmed, active, deltarecovered, recovered, deltadeaths, deaths, transitionIdList, chartIdList,
            timewiseData } = this.props;
        const { tile } = this.state;
        return (
            <div>

                <Waypoint onEnter={this.props.addAnimationToWayUp(transitionIdList[0], 'wayupanimation')}>
                    <div id={transitionIdList[0]}>
                        <TitleIconComponent icon={title} title={state === 'Total' ?
                            'India' : state} />
                        <div className="main_lastUpdt">
                            Last updated {this.props.convertDateToDate(lastupdatedtime)}
                        </div>

                    </div>
                </Waypoint>



                <div className="icsc_qdvc">
                    <Waypoint onEnter={this.props.addAnimationToWayUp(transitionIdList[1], 'wayupanimation1')}>
                        <div className="qdvc_ic clickConfirmedAnim" id={transitionIdList[1]}>
                            {
                                stateInfoLoader && completeDetailsOfRegion !== '' ?
                                    <>
                                        <div className="absolutePosition" onClick={() => this.props.backgroundClickForTile('confirmed')}>
                                            <div className="quickTitle confirmedCo">Confirmed</div>

                                            <div className="confirmedCo delta">
                                                {!(deltaconfirmed === '0' || deltaconfirmed === 0) &&
                                                    <><i className="material-icons  fontSize1 ">arrow_upward</i>
                                                        {typeof deltaconfirmed !== 'undefined' &&
                                                            LimitServices.inLakhsOrCrores(Number(deltaconfirmed))}</>}
                                            </div>

                                            <div className="qvdc_nm">{typeof confirmed !== 'undefined' &&
                                                LimitServices.inLakhsOrCrores(Number(confirmed))}</div>
                                        </div>
                                        {tile === 'confirmed' && <div className="main_tile confirmedBG"></div>}
                                    </>

                                    :
                                    <LoaderComponent />}
                        </div>
                    </Waypoint>
                    <Waypoint onEnter={this.props.addAnimationToWayUp(transitionIdList[2], 'wayupanimation2')}>
                        <div className="qdvc_ic" id={transitionIdList[2]}>
                            {
                                (stateInfoLoader && completeDetailsOfRegion !== '') ?
                                    <>
                                        <div className="absolutePosition" onClick={() => this.props.backgroundClickForTile('active')}>
                                            <div className="quickTitle activeCo">Active</div>

                                            <div className="activeCo delta"></div>

                                            <div className="qvdc_nm">{typeof active !== 'undefined' && LimitServices.inLakhsOrCrores(Number(active))}</div>

                                        </div>
                                        {tile === 'active' && <div className="main_tile activeBG"></div>}
                                    </> :
                                    <LoaderComponent />}


                        </div>
                    </Waypoint>
                    <Waypoint onEnter={this.props.addAnimationToWayUp(transitionIdList[3], 'wayupanimation3')}>
                        <div className="qdvc_ic" id={transitionIdList[3]}>
                            {
                                stateInfoLoader && completeDetailsOfRegion !== '' ?
                                    <>
                                        <div className="absolutePosition" onClick={() => this.props.backgroundClickForTile('recovered')}>
                                            <div className="quickTitle recoveredCo">Recovered</div>

                                            <div className="recoveredCo delta">
                                                {!(deltarecovered === '0' || deltarecovered === 0) &&
                                                    <><i className="material-icons fontSize1">arrow_upward</i>
                                                        {typeof deltarecovered !== 'undefined' && deltarecovered}</>}
                                            </div>

                                            <div className="qvdc_nm">{typeof recovered !== 'undefined' &&
                                                LimitServices.inLakhsOrCrores(Number(recovered))}</div>
                                        </div>
                                        {tile === 'recovered' && <div className="main_tile recoveredBG"></div>}
                                    </> :
                                    <LoaderComponent />}


                        </div>
                    </Waypoint>
                    <Waypoint onEnter={this.props.addAnimationToWayUp(transitionIdList[4], 'wayupanimation1')}>
                        <div className="qdvc_ic" id={transitionIdList[4]}>
                            {
                                stateInfoLoader && completeDetailsOfRegion !== '' ?
                                    <>
                                        <div className="absolutePosition" onClick={() => this.props.backgroundClickForTile('deceased')}>
                                            <div className="quickTitle deceasedCo">Deceased</div>

                                            <div className="deceasedCo delta">
                                                {!(deltadeaths === '0' || deltadeaths === 0) &&
                                                    <><i className="material-icons fontSize1 ">arrow_upward</i>
                                                        {deltadeaths}</>}
                                            </div>
                                            <div className="qvdc_nm">
                                                {typeof deaths !== 'undefined' && LimitServices.inLakhsOrCrores(Number(deaths))}
                                            </div>
                                        </div>
                                        {tile === 'deceased' && <div className="main_tile deceasedBG"></div>}
                                    </> :
                                    <LoaderComponent />}
                        </div>
                    </Waypoint>
                </div>


                {typeof timewiseData !== 'undefined' && timewiseData.length !== 0 &&
                    <div id="miniLineCharts">
                        <div className="miniLineCharts_qdvc">
                            <div id={chartIdList[0]}></div>
                        </div>
                        <div className="miniLineCharts_qdvc">
                            <span role="img" aria-label="heart emoji"> &#10084;&#65039;</span>
                        </div>
                        <div className="miniLineCharts_qdvc">
                            <div id={chartIdList[1]}></div>
                        </div>
                        <div className="miniLineCharts_qdvc">
                            <div id={chartIdList[2]}></div>
                        </div>
                    </div>
                }

                {(typeof completeDetailsOfRegion.info2 !== 'undefined' && completeDetailsOfRegion.info2 !== '') ?
                    <div className="metaPop">
                        <div className="qdvc_ic">
                            <div>
                                <div className="quickTitle subCo">Population</div>
                                <div className="deceasedCo delta">
                                    <i className="material-icons material-icons-outlined 2 anyCo">groups</i>
                                </div>
                                {typeof completeDetailsOfRegion.info2 !== 'undefined' &&
                                    typeof completeDetailsOfRegion.info2.meta !== 'undefined' &&
                                    typeof completeDetailsOfRegion.info2.meta.population !== 'undefined' ?
                                    <div className="qvdc_nm">
                                        {LimitServices.inLakhsOrCrores(Number(completeDetailsOfRegion.info2.meta.population))}
                                    </div>
                                    :

                                    <>

                                        <small><b>
                                            N/A
                                        </b></small>

                                    </>


                                }
                            </div>
                        </div>
                        <div className="qdvc_ic">
                            <div>
                                <div className="quickTitle subCo">Total Tests</div>
                                <div className="deceasedCo delta">
                                    {!(deltadeaths === '0' || deltadeaths === 0) &&

                                        <>
                                            {state === 'Total' ? <>
                                                <i className="material-icons fontSize1 ">arrow_upward</i>
                                                {LimitServices.inLakhsOrCrores(typeof completeDetailsOfRegion.info2.delta.tested !== 'undefined'
                                                    && Number(completeDetailsOfRegion.info2.delta.tested))}</>
                                                :
                                                <>
                                                    {(completeDetailsOfRegion.info2 !== '' &&
                                                        typeof completeDetailsOfRegion.info2.delta !== 'undefined' &&
                                                        typeof completeDetailsOfRegion.info2.delta.tested !== 'undefined') && <>
                                                            <i className="material-icons fontSize1 ">arrow_upward</i>
                                                            {typeof completeDetailsOfRegion.info2.delta.tested !== 'undefined'
                                                                && LimitServices.inLakhsOrCrores(Number(completeDetailsOfRegion.info2.delta.tested))}
                                                        </>}
                                                </>
                                            }
                                        </>
                                    }
                                </div>
                                {typeof completeDetailsOfRegion.info2.total.tested !== 'undefined' ?
                                    <>
                                        {state === 'Total' ?
                                            <div className="qvdc_nm">
                                                {completeDetailsOfRegion.info2.total.tested.states && completeDetailsOfRegion.info2.total.tested.states.samples
                                                    && LimitServices.inLakhsOrCrores(Number(completeDetailsOfRegion.info2.total.tested.states.samples))}</div>
                                            :

                                            <div className="qvdc_nm">
                                                {(typeof completeDetailsOfRegion.info2.total.tested !== 'undefined')
                                                    && LimitServices.inLakhsOrCrores(Number(completeDetailsOfRegion.info2.total.tested))}
                                            </div>}
                                    </>
                                    :
                                    <>

                                        <small><b>
                                            N/A
                                        </b></small>

                                    </>}
                            </div>
                        </div>
                    </div>

                    :
                    <div className="metaPop">
                        <div className="qdvc_ic">
                            <div>
                                <div className="quickTitle subCo">Population</div>
                                <div className="deceasedCo delta">
                                    <i className="material-icons material-icons-outlined 2 anyCo">groups</i>

                                </div>
                                <small><b>
                                    N/A
                                </b></small>
                            </div>
                        </div>

                        <div className="qdvc_ic">
                            <div>
                                <div className="quickTitle subCo">Total Tests</div>
                                <div className="deceasedCo delta">
                                </div>
                                <small><b>
                                    N/A
                                </b></small>
                            </div>
                        </div>

                    </div>
                }
                {typeof completeDetailsOfRegion.info2 !== 'undefined' &&
                    typeof completeDetailsOfRegion.info2.meta !== 'undefined' &&
                    typeof completeDetailsOfRegion.info2.meta.tested !== 'undefined' &&
                    typeof completeDetailsOfRegion.info2.meta.tested.source !== 'undefined' &&
                    <div className="main_lastUpdt checkSorcInfo">
                        Covid19 Tests information Source available <a href={completeDetailsOfRegion.info2.meta.tested.source}
                            target="_noblank"
                            onClick={this.openLink.bind(this, completeDetailsOfRegion.info2.meta.tested.source)}>here</a>
                    </div>}
            </div>
        )
    }
}
