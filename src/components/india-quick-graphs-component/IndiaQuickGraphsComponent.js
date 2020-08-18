import React, { Component } from 'react';
import { CountryEveryEventSummaryMultiLineChart } from '../../chart-services/CountryEveryEventSummaryMultiLineChart';
import { CovidServices } from '../../services/CovidServices';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';
import './IndiaQuickGraphsComponent.css';
import { Waypoint } from 'react-waypoint';

export default class IndiaQuickGraphsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chosenTab: 'monthly'

        }
        this.resizingWindowHandler = this.resizingWindowHandler.bind(this);
    }
    componentDidMount() {
        this.countryWiseCompleteSummary();
        window.addEventListener('resize', this.resizingWindowHandler, false);
    }

    resizingWindowHandler(event) {
        CountryEveryEventSummaryMultiLineChart.vividMultiLineChart('cov_2', this.state.data, this.state.chosenTab);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizingWindowHandler, false);
    }

    countryWiseCompleteSummary() {
        CovidServices.countryWiseData('india')
            .then((result) => {
                this.setState({
                    ...this.state,
                    data: result.data
                });
                CountryEveryEventSummaryMultiLineChart.vividMultiLineChart('cov_2', result.data, this.state.chosenTab);
            }).catch((err) => {

            });
    }

    choseTabHandler(type, event) {
        this.setState({
            ...this.state,
            chosenTab: type
        }, () => {
            CountryEveryEventSummaryMultiLineChart.vividMultiLineChart('cov_2', this.state.data, this.state.chosenTab);
        });
    }

    render() {
        const { chosenTab, data } = this.state;
        return (
            <div>
                <TitleIconComponent icon="timeline" title="India's Covid Statistics" />
                <div className="main_lastUpdt">
                    Simple Active, Recovered, Confirmed, Death Statistics
                </div>
                <Waypoint onEnter={() => this.props.addAnimationToWayUp('quickDataContent', 'wayupanimation')}>
                    <div className="content5" id="quickDataContent">
                        <div className="tab_content">
                            <div className={chosenTab === 'lastweek' ? 'tab animateTab' : 'tab selectedTab'} onClick={this.choseTabHandler.bind(this, 'lastweek')}>
                                Last Week </div>
                            <div className={chosenTab === 'weekly' ? 'tab animateTab' : 'tab selectedTab'} onClick={this.choseTabHandler.bind(this, 'weekly')}>
                                Weekly</div>
                            <div className={chosenTab === 'monthly' ? 'tab animateTab' : 'tab selectedTab'} onClick={this.choseTabHandler.bind(this, 'monthly')}>
                                Month</div>
                            <div className={chosenTab === 'cumulative' ? 'tab animateTab' : 'tab selectedTab'} onClick={this.choseTabHandler.bind(this, 'cumulative')}>
                                cumulative</div>
                        </div>
                    </div>
                </Waypoint>
                <Waypoint onEnter={() => this.props.addAnimationToWayUp('ingrph', 'wayupanimation5')}>
                    <div id="ingrph">
                        {data.length !== 0 ?
                            <div id="cov_2"></div>
                            :
                            <div className="loaderGraph">
                            </div>
                        }
                    </div>
                </Waypoint>
            </div>
        )
    }
}
