import React, { Component } from 'react';
import HeaderComponent from './components/header-component/HeaderComponent';
import QuickDataViewComponent from './components/quick-data-view-component/QuickDataViewComponent';
import { CovidServices } from './services/CovidServices';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryDataCountries: [],
      loggedCountryName: '',
      loggedCountryCode: '',
      totals: '',
      countryList: []
    }
  }

  componentDidMount() {
    CovidServices.countryName()
      .then((result) => {
        this.setState({
          ...this.state,
          loggedCountryName: result.data.country_name,
          loggedCountryCode: result.data.country_code
        })
      }).catch((err) => {

      });
    CovidServices.todaysSummary()
      .then((result) => {
        this.setState({
          ...this.state,
          summaryDataCountries: result.data.Countries,
          totals: result.data.Global,
        })
      }).catch((err) => {

      });
    CovidServices.listAllCountries()
      .then((result) => {
        this.setState({
          ...this.state,
          countryList: result.data
        })
      }).catch((err) => {

      });

  }

  render() {
    const { summaryDataCountries, loggedCountryName, loggedCountryCode, totals, countryList } = this.state;
    return (
      <div>
        <div className="compatibility_mobile">
          <header>
            <HeaderComponent loggedCountryName={loggedCountryName} />
          </header>


          <article>
            <QuickDataViewComponent totals={totals} />

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
