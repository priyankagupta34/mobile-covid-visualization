import React, { Component } from 'react';
import { CountrySummaryMultiLineChart } from '../../chart-services/CountrySummaryMultiLineChart';
import { CovidServices } from '../../services/CovidServices';
import { DataStructureServices } from '../../services/DataStructureServices';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';
import './CovidWorldComparision.css';

export default class CovidWorldComparision extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countrya: '',
            countryb: '',
            countryc: '',
            countryaList: [],
            countrybList: [],
            countrycList: [],
            countryList: [],
            eventType: 'Active',
            showLoader: true,
            resize: window.innerWidth
        }
        this.resizingWindowHandler = this.resizingWindowHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizingWindowHandler, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizingWindowHandler, false);
    }

    resizingWindowHandler(event) {
        if (window.innerWidth !== this.state.resize) {
            this.drawingComparisionGraph();
        }
    }

    componentDidUpdate(prev) {
        if (prev.countryList.length !== this.props.countryList.length) {
            this.setState((state, props) => {
                const countryList = DataStructureServices.mergeSort(props.countryList, 'Country');
                state.countryList = countryList;
                state.countrya = countryList[0].Slug;
                state.countryb = countryList[1].Slug;
                state.countryc = countryList[2].Slug;
                this.creatingMultiChartWithDataCapturing();
                return state;
            })
        }
    }


    creatingMultiChartWithDataCapturing() {
        Promise.all([CovidServices.countryWiseData(this.state.countrya),
        CovidServices.countryWiseData(this.state.countryb),
        CovidServices.countryWiseData(this.state.countryc)])
            .then((result) => {
                let countryaList = [];
                let countrybList = [];
                let countrycList = [];
                if (result[0].data.length !== 0 && result[0].data.length >= 50) {
                    countryaList = result[0].data.slice(result[0].data.length - 50);
                }
                if (result[1].data.length !== 0 && result[1].data.length >= 50) {
                    countrybList = result[1].data.slice(result[1].data.length - 50);
                }
                if (result[2].data.length !== 0 && result[2].data.length >= 50) {
                    countrycList = result[2].data.slice(result[2].data.length - 50);
                }
                this.setState(state => {
                    state.countryaList = countryaList;
                    state.countrybList = countrybList;
                    state.countrycList = countrycList;
                    state.showLoader = false;
                    return state;
                }, () => {
                    this.drawingComparisionGraph();
                })

            }).catch((err) => {
                this.setState({
                    ...this.state,
                    showLoader: false
                })
            });

    }

    drawingComparisionGraph() {
        CountrySummaryMultiLineChart.multiLineChart(
            this.state.countryaList,
            this.state.countrybList,
            this.state.countrycList, this.state.eventType, 'cov_6');
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
        const { countrya, countryb, countryc, eventType, showLoader, countryList, countryaList, countrybList, countrycList } = this.state;
        return (
            <div className="backgroundDistInfo">
                <TitleIconComponent icon="map" title="Let's Compare Covid Across Countries"></TitleIconComponent>
                <div className="main_lastUpdt">
                    Select 3 countries from dropdown and an event
                </div>

                <div className="nd_sm centered">
                    <div>
                        <select className="input_ser" value={countrya} onChange={this.changingCountryHandler.bind(this, 'countrya')}>
                            {countryList.map((item, index) =>
                                <option key={index} value={item.Slug}>{item.Country}</option>
                            )}
                        </select>
                        <select className="input_ser" value={countryb} onChange={this.changingCountryHandler.bind(this, 'countryb')}>
                            {countryList.map((item, index) => (
                                <option key={index} value={item.Slug}>{item.Country}</option>
                            )
                            )}
                        </select>
                        <select className="input_ser" value={countryc} onChange={this.changingCountryHandler.bind(this, 'countryc')}>
                            {countryList.map((item, index) => (
                                <option key={index} value={item.Slug}>{item.Country}</option>
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
                    {showLoader ? <i className="material-icons fontSize1 animateAnchor">anchor</i> :
                        <i className="material-icons fontSize1">anchor</i>}
                    {(countryaList.length !== 0 || countrybList.length !== 0 || countrycList.length !== 0) ?
                        <div id="cov_6"></div>
                        :
                        <div className="loaderGraph compari">
                        </div>
                    }
                </div>

            </div>
        )
    }
}
