import React, { Component } from 'react';
import { CountrySummaryMultiLineChart } from '../../chart-services/CountrySummaryMultiLineChart';
import { CovidServices } from '../../services/CovidServices';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';
import './CovidWorldComparision.css';

export default class CovidWorldComparision extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countrya: '',
            countryb: '',
            countryc: '',
            countryList: [],
            eventType: 'Active',
            showLoader: ''
        }
    }

    componentDidUpdate(prev) {
        // this.countryWiseCompleteSummary(this.props.loggedCountryName);
        if (prev.countryList.length !== this.props.countryList.length) {
            this.setState({
                ...this.state,
                countryList: this.props.countryList,
                countrya: this.props.countryList[0].Slug,
                countryb: this.props.countryList[1].Slug,
                countryc: this.props.countryList[2].Slug
            }, () => {
                this.creatingMultiChartWithDataCapturing();
            })
        }
    }


    creatingMultiChartWithDataCapturing() {
        Promise.all([CovidServices.countryWiseData(this.state.countrya),
        CovidServices.countryWiseData(this.state.countryb),
        CovidServices.countryWiseData(this.state.countryc)])
            .then((result) => {
                let countrya = [];
                let countryb = [];
                let countryc = [];
                if (result[0].data.length !== 0 && result[0].data.length >= 50) {
                    countrya = result[0].data.slice(result[0].data.length - 50);
                }
                if (result[1].data.length !== 0 && result[1].data.length >= 50) {
                    countryb = result[1].data.slice(result[1].data.length - 50);
                }
                if (result[2].data.length !== 0 && result[2].data.length >= 50) {
                    countryc = result[2].data.slice(result[2].data.length - 50);
                }
                CountrySummaryMultiLineChart.multiLineChart(
                    countrya,
                    countryb,
                    countryc, this.state.eventType, 'cov_6');
                this.setState({
                    ...this.state,
                    showLoader: false
                })
            }).catch((err) => {
                this.setState({
                    ...this.state,
                    showLoader: true
                })
            });

    }

    changingCountryHandler(country, event) {
        this.setState({
            ...this.state,
            [country]: event.target.value,
            showLoader: true
        }, () => {
            this.creatingMultiChartWithDataCapturing()
        })
    }

    render() {
        const { countrya, countryb, countryc, eventType } = this.state;
        const { countryList } = this.props;
        return (
            <div className="backgroundDistInfo">
                <TitleIconComponent icon="map" title="Let's Compare Covid Across Countries"></TitleIconComponent>
                <div className="main_lastUpdt">
                    Select 3 countries from dropdown and an event
                </div>

                <div className="nd_sm centered">
                    <div>
                        <select className="input_ser" value={countrya} onChange={this.changingCountryHandler.bind(this, 'countrya')}>
                            {countryList.map(item =>
                                <option key={item.country} value={item.Slug}>{item.Country}</option>
                            )}
                        </select>
                        <select className="input_ser" value={countryb} onChange={this.changingCountryHandler.bind(this, 'countryb')}>
                            {countryList.map(item => (
                                <option key={item.country} value={item.Slug}>{item.Country}</option>
                            )
                            )}
                        </select>
                        <select className="input_ser" value={countryc} onChange={this.changingCountryHandler.bind(this, 'countryc')}>
                            {countryList.map(item => (
                                <option key={item.Country} value={item.Slug}>{item.Country}</option>
                            )
                            )}
                        </select>
                        <select className="input_ser" value={eventType} onChange={this.changingCountryHandler.bind(this, 'eventType')}>
                            <option key={'Active'} value={'Active'}>Active</option>
                            <option key={'Confirmed'} value={'Confirmed'}>Confirmed</option>
                            <option key={'Deaths'} value={'Deaths'}>Deaths</option>
                            <option key={'Recovered'} value={'Recovered'}>Recovered</option>
                        </select>
                    </div>

                    {/* <div style={{ height: 50 }}>
                        {showLoader &&
                            <img src="imgs/loader.gif" alt="loader"></img>}
                    </div> */}

                    <div id="cov_6"></div>
                </div>

            </div>
        )
    }
}
