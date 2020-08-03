import React, { Component } from 'react';
import HeaderComponent from './components/header-component/HeaderComponent';
import QuickDataViewComponent from './components/quick-data-view-component/QuickDataViewComponent';
import { CovidServices } from './services/CovidServices';
import TopFiveCategoryComponent from './components/top-five-category-component/TopFiveCategoryComponent';
import WorldMapCoverComponent from './components/world-map-cover-component/WorldMapCoverComponent';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryDataCountries: [],
      loggedCountryName: '',
      loggedCountryCode: '',
      totals: '',
      countryList: [],
      totalLoader: false
    }
  }

  componentDidMount() {
    Promise.all([
      CovidServices.countryName(),
      CovidServices.todaysSummary(),
      CovidServices.listAllCountries()
    ]).then(result => {
      this.setState({
        ...this.state,
        loggedCountryName: result[0].data.country_name,
        loggedCountryCode: result[0].data.country_code,
        summaryDataCountries: result[1].data.Countries,
        totals: result[1].data.Global,
        countryList: result[2].data,
        totalLoader: true

      })
    }).catch((err) => {
    });
    // CovidServices.countryName()
    //   .then((result) => {
    //     this.setState({
    //       ...this.state,
    //       loggedCountryName: result.data.country_name,
    //       loggedCountryCode: result.data.country_code
    //     })
    //   }).catch((err) => {

    //   });
    // CovidServices.todaysSummary()
    //   .then((result) => {
    //     this.setState({
    //       ...this.state,
    //       summaryDataCountries: result.data.Countries,
    //       totals: result.data.Global,
    //       totalLoader: true
    //     })
    //   }).catch((err) => {

    //   });
    // CovidServices.listAllCountries()
    //   .then((result) => {
    //     this.setState({
    //       ...this.state,
    //       countryList: result.data
    //     })
    //   }).catch((err) => {

    //   });

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
        <div className="compatibility_mobile">
          <header>
            <HeaderComponent loggedCountryName={loggedCountryName} />
          </header>


          <article>
            <QuickDataViewComponent totals={totals} totalLoader={totalLoader} />
            <TopFiveCategoryComponent  summaryDataCountries={summaryDataCountries}
              loggedCountryName={loggedCountryName} />
            <WorldMapCoverComponent  summaryDataCountries={summaryDataCountries}  />

          </article>
        </div>

        <div className="no_compatibility_mobile">
          <div className="no_compat">
            <div>This is designed just for mobile</div>
            <div>To continue viewing on desktop device please below.</div>
            <a href="https://covid-visualization-live.netlify.app/" >covid-visualization</a>
          </div>
        </div>
      </div>
    )
  }
}
