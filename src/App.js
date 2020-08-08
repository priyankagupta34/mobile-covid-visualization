import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/header-component/HeaderComponent';
import WorldwideInfoComponent from './components/worldwide-info-component/WorldwideInfoComponent';
import IndiaCovidshowComponent from './components/india-covidshow-component/IndiaCovidshowComponent';
import SearchDetailedComponent from './components/search-detailed-component/SearchDetailedComponent';
import { CovidServices } from './services/CovidServices';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedCountryName: 'India',
      loggedCountryCode: 'IN',
      tryAgainLoader: false,
      stateInfoLoader: false,
      completeStateInfoWithDelta: '',
      stateInfoWithCode: '',
      codeWiseQuick4Data: '',
      onlyCountryInfo: '',
      wholeDetailsByCode: {}
    }

    this.loadStateWiseInfo = this.loadStateWiseInfo.bind(this);
    this.convertTimestampToEpochToDate = this.convertTimestampToEpochToDate.bind(this);
    this.convertDateToDate = this.convertDateToDate.bind(this);
  }

  componentDidMount() {
    this.loadStateWiseInfo();
  }

  loadStateWiseInfo() {
    Promise.all([CovidServices.stateWiseForIndia(),
    CovidServices.stateWiseForIndiaMinComplete(),
    CovidServices.stateWiseForIndiaForActiveCase()
    ])
      .then((result) => {
        this.setState({
          ...this.state,
          stateInfoLoader: true,
          stateInfoWithCode: result[0].data,
          completeStateInfoWithDelta: result[1].data,
          codeWiseQuick4Data: result[2].data
        })
      }).catch((err) => {
        this.setState({
          ...this.state,
          tryAgainLoader: true
        })
      });
  }

  findDetailsByCode(code) {
    let infoObject = { info1: "", info2: '', info3: '' };
    if (this.state.codeWiseQuick4Data !== '') {
      infoObject.info2 = this.state.completeStateInfoWithDelta[code];
      let stateFound = '';
      for (let i = 0; i < this.state.codeWiseQuick4Data.statewise.length - 1; i++) {
        if (this.state.codeWiseQuick4Data.statewise[i].statecode === code) {
          infoObject.info3 = this.state.codeWiseQuick4Data.statewise[i];
          if (this.state.codeWiseQuick4Data.statewise[i].state !== 'Total') {
            stateFound = this.state.codeWiseQuick4Data.statewise[i].state;
          }
        }
      }

      if (stateFound !== '') {
        infoObject.info1 = this.state.stateInfoWithCode[stateFound];
      }
    }
    return infoObject;
  }

  
  convertTimestampToEpochToDate(utcSeconds) {
    const epochStamp = new Date(0);
    const timestamp = epochStamp.setUTCSeconds(utcSeconds);
    const currentTimeStamp = new Date().getTime();
    if (new Date().toDateString() === new Date(timestamp).toDateString()) {
        const hour = Math.ceil((currentTimeStamp - timestamp) / (3600 * 1000));
        if (hour === 1) {
            return `${hour} Hour Ago`
        } else {
            return `${hour} Hours Ago`
        }
    } else
        return new Date(timestamp).toDateString();
}

  
  convertDateToDate(date) {
    const updateTimeStamp = new Date(date).getTime();
    const currentTimeStamp = new Date().getTime();
    if (new Date(date).toDateString() === new Date().toDateString()) {
        const hour = Math.ceil((currentTimeStamp - updateTimeStamp) / (3600 * 1000));
        if (hour === 1) {
            return `${hour} Hour Ago`
        } else {
            return `${hour} Hours Ago`
        }
    } else
        return new Date(date).toDateString();
}



  render() {

    const {
      loggedCountryName, tryAgainLoader, stateInfoWithCode, completeStateInfoWithDelta, stateInfoLoader, codeWiseQuick4Data
    } = this.state;
    return (
      <div>
        <div className="compatibility_mobile">
          <Router>
            <header>
              <HeaderComponent loggedCountryName={loggedCountryName} 
              convertTimestampToEpochToDate={this.convertTimestampToEpochToDate}/>
            </header>


            <article className="article1">
              <Switch>
                <Route path="/world" exact render={(props) => {
                  return (<WorldwideInfoComponent {...props} />);
                }} />
                <Route path="/india" exact render={(props) => {
                  return (<IndiaCovidshowComponent {...props}
                    completeStateInfoWithDelta={completeStateInfoWithDelta}
                    stateInfoWithCode={stateInfoWithCode}
                    stateInfoLoader={stateInfoLoader}
                    codeWiseQuick4Data={codeWiseQuick4Data}
                    findDetailsByCode={this.findDetailsByCode.bind(this)}
                    convertDateToDate={this.convertDateToDate}

                  />);
                }} />
                <Route path="/search" exact render={(props) => {
                  return (<SearchDetailedComponent {...props}
                    stateInfoLoader={stateInfoLoader}
                    stateInfoWithCode={stateInfoWithCode}
                    completeStateInfoWithDelta={completeStateInfoWithDelta}
                    findDetailsByCode={this.findDetailsByCode.bind(this)}
                    convertTimestampToEpochToDate={this.convertTimestampToEpochToDate}
                    codeWiseQuick4Data={codeWiseQuick4Data} />);
                }} />
              </Switch>
            </article>

            <footer>
              <i className="material-icons  material-icons-outlined qdvc_in_ic">leak_add</i>
              <div className="centered"><font color="white">
                <small className="colorfordark">Created with React.js and d3.js</small>
                <br></br>
                <small className="colorfordark">Used apis from <a href="https://covid19api.com/">covid19</a> &&nbsp;<a href="https://www.covid19india.org//">covid19india</a></small>
              </font></div>
              <i className="material-icons  material-icons-outlined qdvc_in_ic">leak_add</i>
            </footer>

          </Router>


        </div>

        <div className="no_compatibility_mobile">
          <div className="no_compat">
            <div>This is designed just for mobile</div>
            <div>To continue viewing on desktop device please below.</div>
            <a href="https://covid-visualization-live.netlify.app/" >covid-visualization</a>
          </div>
        </div>

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
