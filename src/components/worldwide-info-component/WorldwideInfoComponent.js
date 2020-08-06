import React, { Component } from 'react'
import { CovidServices } from '../../services/CovidServices'
import QuickDataViewComponent from '../quick-data-view-component/QuickDataViewComponent'
import TopFiveCategoryComponent from '../top-five-category-component/TopFiveCategoryComponent'
import WorldMapCoverComponent from '../world-map-cover-component/WorldMapCoverComponent'
import './WorldwideInfoComponent.css'

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
                <QuickDataViewComponent totals={totals} totalLoader={totalLoader} />
                <TopFiveCategoryComponent summaryDataCountries={summaryDataCountries}
                    loggedCountryName={loggedCountryName} />
                <WorldMapCoverComponent summaryDataCountries={summaryDataCountries} />
            </div>
        )
    }
}
