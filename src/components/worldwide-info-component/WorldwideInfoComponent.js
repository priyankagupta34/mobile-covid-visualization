import React, { Component } from 'react'
import { CovidServices } from '../../services/CovidServices'
import QuickDataViewComponent from '../quick-data-view-component/QuickDataViewComponent'
import TopChartComponent from '../top-chart-component/TopChartComponent'
import WorldMapCoverComponent from '../world-map-cover-component/WorldMapCoverComponent'
import './WorldwideInfoComponent.css'
import { Waypoint } from 'react-waypoint';

export default class WorldwideInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summaryDataCountries: [],
            loggedCountryName: 'India',
            loggedCountryCode: 'IN',
            totals: '',
            countryList: [],
            totalLoader: false
        }
    }

    addAnimationToWayUp(id) {
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
        });

    }

    render() {
        const {
            summaryDataCountries,
            loggedCountryName,
            //  loggedCountryCode, 
            totals,
            totalLoader
            // countryList
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

                <Waypoint onEnter={this.addAnimationToWayUp.bind(this, 'worldMapCoverComponent')}>
                    <div id="worldMapCoverComponent">
                        <WorldMapCoverComponent summaryDataCountries={summaryDataCountries} />
                    </div>
                </Waypoint>
            </div>
        )
    }
}
