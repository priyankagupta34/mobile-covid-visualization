import React, { Component } from 'react'
import './QuickDataViewComponent.css'
import TitleIconComponent from '../title-icon-component/TitleIconComponent'
import LoaderComponent from '../loader-component/LoaderComponent';
import { Waypoint } from 'react-waypoint';

export default class QuickDataViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenTab: true
        }
    }
    componentDidMount() {

    }

    choseTabHandler(chosen, event) {
        if (chosen === 'new') {
            this.setState({
                ...this.state,
                chosenTab: true
            })
        } else {
            this.setState({
                ...this.state,
                chosenTab: false
            })
        }
    }

    addAnimationToWayUp(id, anim) {
        const component = window.document.getElementById(id);
        component.classList.add(anim);
    }



    render() {
        const { totals, totalLoader } = this.props;
        const { chosenTab } = this.state;
        return (
            <>

                <TitleIconComponent icon="menu_book" title={chosenTab ? 'new cases' : 'total cases'} />
                <div className="content1" id="quickDataContent">

                    <div className="tab_content">
                        <div className={chosenTab ? 'tab' : 'tab selectedTab'} onClick={this.choseTabHandler.bind(this, 'new')}>
                            New
                        </div>
                        <div className={!chosenTab ? 'tab' : 'tab selectedTab'} onClick={this.choseTabHandler.bind(this, 'total')}>
                            Total
                        </div>
                    </div>
                    {chosenTab ?
                        <div className="qdvc1">
                            <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'rec', 'wayupanimation1')}>
                                <div className="qdvc_ic" id="rec">
                                    {
                                        totalLoader ?
                                            <div>
                                                <div className="quickTitle">Recovered</div>
                                                <div className="qvdc_nm">{totals.NewRecovered}</div>
                                            </div> :
                                            <LoaderComponent />}

                                </div>
                            </Waypoint>
                            <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'dea', 'wayupanimation2')}>
                                <div className="qdvc_ic" id="dea">

                                    {
                                        totalLoader ?
                                            <div>
                                                <div className="quickTitle">Deaths</div>
                                                <div className="qvdc_nm">{totals.NewDeaths}</div>
                                            </div> :
                                            <LoaderComponent />}


                                </div>
                            </Waypoint>
                            <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'con', 'wayupanimation3')}>
                                <div className="qdvc_ic" id="con">
                                    {
                                        totalLoader ?
                                            <div>
                                                <div className="quickTitle">Confirmed</div>
                                                <div className="qvdc_nm">{totals.NewConfirmed}</div>
                                            </div> :
                                            <LoaderComponent />}


                                </div>
                            </Waypoint>
                        </div>
                        :

                        <div className="content">
                            <div className="qdvc1">
                                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'rec1', 'wayupanimation1')}>
                                    <div className="qdvc_ic" id="rec1">
                                        {
                                            totalLoader ?
                                                <div>
                                                    <div className="quickTitle">Recovered</div>
                                                    <div className="qvdc_nm">{totals.TotalRecovered}</div>
                                                </div> :
                                                <LoaderComponent />}


                                    </div>
                                </Waypoint>
                                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'dea1', 'wayupanimation2')}>
                                    <div className="qdvc_ic" id="dea1">
                                        {
                                            totalLoader ?
                                                <div>
                                                    <div className="quickTitle">Deaths</div>
                                                    <div className="qvdc_nm">{totals.TotalDeaths}</div>
                                                </div> :
                                                <LoaderComponent />}

                                    </div>
                                </Waypoint>
                                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'con1', 'wayupanimation3')}>
                                    <div className="qdvc_ic" id="con1">   {
                                        totalLoader ?
                                            <div>
                                                <div className="quickTitle">Confirmed</div>
                                                <div className="qvdc_nm">{totals.TotalConfirmed}</div>
                                            </div> :
                                            <LoaderComponent />}
                                    </div>
                                </Waypoint>
                            </div>
                        </div>

                    }

                </div>
            </>
        )
    }
}
