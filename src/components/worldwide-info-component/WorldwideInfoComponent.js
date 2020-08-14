import React, { Component } from 'react'
import { CovidServices } from '../../services/CovidServices'
import QuickDataViewComponent from '../quick-data-view-component/QuickDataViewComponent'
import TopChartComponent from '../top-chart-component/TopChartComponent'
import WorldMapCoverComponent from '../world-map-cover-component/WorldMapCoverComponent'
import './WorldwideInfoComponent.css'
import { Waypoint } from 'react-waypoint';
import CovidWorldComparision from '../covid-world-comparision/CovidWorldComparision'

export default class WorldwideInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summaryDataCountries: [],
            loggedCountryName: 'India',
            loggedCountryCode: 'IN',
            totals: '',
            countryList: [],
            totalLoader: false,
            tryAgainLoader: false
        }
    }

    addAnimationToWayUp(id, event) {
        const component = window.document.getElementById(id);
        component.classList.add('wayupanimation');
    }

    componentDidMount() {
        Promise.all([
            CovidServices.todaysSummary(),
            CovidServices.listAllCountries()
        ]).then(result => {
            this.setState({
                ...this.state,
                summaryDataCountries: result[0].data.Countries,
                totals: result[0].data.Global,
                countryList: result[1].data,
                totalLoader: true

            })
        }).catch((err) => {
            this.setState({
                ...this.state,
                tryAgainLoader: true
            })
        });
    }

    reload() {
        window.location.reload()
    }

    render() {
        const {
            summaryDataCountries,
            loggedCountryName,
            totals,
            totalLoader,
            tryAgainLoader,
            countryList
        } = this.state;

        return (
            <div>
                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'quickDataViewComponent')}>
                    <div id="quickDataViewComponent">
                        <QuickDataViewComponent totals={totals} totalLoader={totalLoader} />
                    </div>
                </Waypoint>

                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'TopChartComponent')}>
                    <div id="TopChartComponent">
                        <TopChartComponent summaryDataCountries={summaryDataCountries}
                            loggedCountryName={loggedCountryName} />
                    </div>
                </Waypoint>

                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'twigh')}>
                    <div id="twigh">
                        <WorldMapCoverComponent summaryDataCountries={summaryDataCountries} />
                    </div>
                </Waypoint>

                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'compar')}>
                    <div id="compar">
                        <CovidWorldComparision
                            summaryDataCountries={summaryDataCountries}
                            loggedCountryName={loggedCountryName}
                            countryList={countryList}
                            loggedCountryCode={'India'}
                        />
                    </div>
                </Waypoint>

                {tryAgainLoader &&
                    <div className="tryagainloader">
                        <div>
                            <div>No internet.</div>
                            <div>Please Reload</div>
                            <div>
                                <i className="material-icons my_ic1" onClick={this.reload}>refresh</i>
                            </div>
                        </div>
                    </div>}

            </div>
        )
    }
}
