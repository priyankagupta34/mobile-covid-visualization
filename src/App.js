import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/header-component/HeaderComponent';
import WorldwideInfoComponent from './components/worldwide-info-component/WorldwideInfoComponent';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedCountryName: 'India',
      loggedCountryCode: 'IN'
    }
  }

  componentDidMount() {

  }



  render() {
    const {
      loggedCountryName
    } = this.state;
    return (
      <div>
        <div className="compatibility_mobile">
          <Router>
            <header>
              <HeaderComponent loggedCountryName={loggedCountryName} />
            </header>


            <article className="article1">
              <Switch>
                <Route path="/world" exact component={WorldwideInfoComponent} />
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
      </div>
    )
  }
}
