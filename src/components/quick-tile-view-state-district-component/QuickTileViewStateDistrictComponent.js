import React, { Component } from 'react'
import './QuickTileViewStateDistrictComponent.css'
import { Waypoint } from 'react-waypoint'
import LoaderComponent from '../loader-component/LoaderComponent'
import { LimitServices } from '../../services/LimitServices'
import TitleIconComponent from '../title-icon-component/TitleIconComponent'

export default class QuickTileViewStateDistrictComponent extends Component {
    render() {
        console.log(this.props)
        const { title, state, lastupdatedtime, stateInfoLoader, completeDetailsOfRegion, deltaconfirmed,
            confirmed, active, deltarecovered, recovered, deltadeaths, deaths, transitionIdList } = this.props;
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
                                    <div>
                                        <div className="quickTitle confirmedCo">Confirmed</div>

                                        <div className="confirmedCo delta">
                                            {(deltaconfirmed !== '0' || 0) &&
                                                <><i className="material-icons  fontSize1 ">arrow_upward</i>
                                                    {typeof deltaconfirmed !== 'undefined' && LimitServices.inLakhsOrCrores(Number(deltaconfirmed))}</>}
                                        </div>

                                        <div className="qvdc_nm">{typeof confirmed !== 'undefined' && LimitServices.inLakhsOrCrores(Number(confirmed))}</div>
                                    </div> :
                                    <LoaderComponent />}

                        </div>
                    </Waypoint>
                    <Waypoint onEnter={this.props.addAnimationToWayUp(transitionIdList[2], 'wayupanimation2')}>
                        <div className="qdvc_ic" id={transitionIdList[2]}>

                            {
                                (stateInfoLoader && completeDetailsOfRegion !== '') ?
                                    <div>
                                        <div className="quickTitle activeCo">Active</div>

                                        <div className="activeCo delta"></div>

                                        <div className="qvdc_nm">{typeof active !== 'undefined' && LimitServices.inLakhsOrCrores(Number(active))}</div>
                                    </div> :
                                    <LoaderComponent />}


                        </div>
                    </Waypoint>
                    <Waypoint onEnter={this.props.addAnimationToWayUp(transitionIdList[3], 'wayupanimation3')}>
                        <div className="qdvc_ic" id={transitionIdList[3]}>
                            {
                                stateInfoLoader && completeDetailsOfRegion !== '' ?
                                    <div>
                                        <div className="quickTitle recoveredCo">Recovered</div>

                                        <div className="recoveredCo delta">
                                            {(deltarecovered !== '0' || 0) &&
                                                <><i className="material-icons fontSize1">arrow_upward</i>
                                                    {typeof deltarecovered !== 'undefined' && deltarecovered}</>}
                                        </div>

                                        <div className="qvdc_nm">{typeof recovered !== 'undefined' &&
                                            LimitServices.inLakhsOrCrores(Number(recovered))}</div>
                                    </div> :
                                    <LoaderComponent />}


                        </div>
                    </Waypoint>
                    <Waypoint onEnter={this.props.addAnimationToWayUp(transitionIdList[4], 'wayupanimation1')}>
                        <div className="qdvc_ic" id={transitionIdList[4]}>
                            {
                                stateInfoLoader && completeDetailsOfRegion !== '' ?
                                    <div>
                                        <div className="quickTitle deceasedCo">Deceased</div>

                                        <div className="deceasedCo delta">
                                            {(deltadeaths !== '0' || 0) &&
                                                <><i className="material-icons fontSize1 ">arrow_upward</i>
                                                    {deltadeaths}</>}
                                        </div>
                                        <div className="qvdc_nm">
                                            {typeof deaths !== 'undefined' && LimitServices.inLakhsOrCrores(Number(deaths))}
                                        </div>
                                    </div> :
                                    <LoaderComponent />}
                        </div>
                    </Waypoint>
                </div>

                {(typeof completeDetailsOfRegion.info2 !== 'undefined' && completeDetailsOfRegion.info2 !== '') &&
                    <div className="metaPop">
                        <div className="qdvc_ic">
                            <div>
                                <div className="quickTitle subCo">Population</div>
                                <div className="deceasedCo delta">
                                    <i className="material-icons material-icons-outlined 2 anyCo">groups</i>
                                </div>
                                {typeof completeDetailsOfRegion.info2 !== 'undefined' && typeof completeDetailsOfRegion.info2.meta !== 'undefined' ?
                                    <div className="qvdc_nm">
                                        {typeof completeDetailsOfRegion.info2.meta.population !== 'undefined' &&
                                            LimitServices.inLakhsOrCrores(Number(completeDetailsOfRegion.info2.meta.population))}
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
                                    {(deltadeaths !== '0' || 0) &&

                                        <>
                                            {state === 'Total' ? <>
                                                <i className="material-icons fontSize1 ">arrow_upward</i>
                                                {LimitServices.inLakhsOrCrores(typeof completeDetailsOfRegion.info2.delta.tested.states.samples !== 'undefined'
                                                    && Number(completeDetailsOfRegion.info2.delta.tested.states.samples))}</> :
                                                <>
                                                    {(completeDetailsOfRegion.info2 !== '' &&
                                                        typeof completeDetailsOfRegion.info2.delta !== 'undefined' &&
                                                        typeof completeDetailsOfRegion.info2.delta.tested !== 'undefined') && <>
                                                            <i className="material-icons fontSize1 ">arrow_upward</i>
                                                            {typeof completeDetailsOfRegion.info2.delta.tested.samples !== 'undefined'
                                                                && LimitServices.inLakhsOrCrores(Number(completeDetailsOfRegion.info2.delta.tested.samples))}
                                                        </>}
                                                </>
                                            }
                                        </>
                                    }
                                </div>
                                {typeof completeDetailsOfRegion.info2.total.tested !== 'undefined' ?
                                    <>{state === 'Total' ? <div className="qvdc_nm">
                                        {typeof completeDetailsOfRegion.info2.total.tested.states.samples !== 'undefined'
                                            && LimitServices.inLakhsOrCrores(Number(completeDetailsOfRegion.info2.total.tested.states.samples))}</div> :

                                        <div className="qvdc_nm">
                                            {(typeof completeDetailsOfRegion.info2.total.tested.samples !== 'undefined')
                                                && LimitServices.inLakhsOrCrores(Number(completeDetailsOfRegion.info2.total.tested.samples))}
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
                }
            </div>
        )
    }
}
