import React, { Component } from 'react'
import './QuickDataViewComponent.css'
import TitleIconComponent from '../title-icon-component/TitleIconComponent'
import LoaderComponent from '../loader-component/LoaderComponent';

export default class QuickDataViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenTab: true
        }
    }
    componentDidMount() {

    }

    choseTabHandler(chosen, event) {
        if (chosen === 'new') {
            this.setState({
                ...this.state,
                chosenTab: true
            })
        } else {
            this.setState({
                ...this.state,
                chosenTab: false
            })
        }
    }



    render() {
        const { totals, totalLoader } = this.props;
        const { chosenTab } = this.state;
        return (
            <>

                <TitleIconComponent icon="menu_book" title={chosenTab ? 'new cases' : 'total cases'} />
                    <div className="content1" id="quickDataContent">

                        <div className="tab_content">
                            <div className={chosenTab ? 'tab' : 'tab selectedTab'} onClick={this.choseTabHandler.bind(this, 'new')}>
                                New
                        </div>
                            <div className={!chosenTab ? 'tab' : 'tab selectedTab'} onClick={this.choseTabHandler.bind(this, 'total')}>
                                Total
                        </div>
                        </div>
                        {chosenTab ?
                            <div className="qdvc1">
                                <div className="qdvc_ic">
                                    {
                                        totalLoader ?
                                            <div>
                                                <div>Recovered</div>
                                                <div className="qvdc_nm">{totals.NewRecovered}</div>
                                            </div> :
                                            <LoaderComponent />}

                                </div>
                                <div className="qdvc_ic">

                                    {
                                        totalLoader ?
                                            <div>
                                                <div>Deaths</div>
                                                <div className="qvdc_nm">{totals.NewDeaths}</div>
                                            </div> :
                                            <LoaderComponent />}


                                </div>
                                <div className="qdvc_ic">
                                    {
                                        totalLoader ?
                                            <div>
                                                <div>Confirmed</div>
                                                <div className="qvdc_nm">{totals.NewConfirmed}</div>
                                            </div> :
                                            <LoaderComponent />}


                                </div>
                            </div>
                            :

                            <div className="content">
                                <div className="qdvc1">
                                    <div className="qdvc_ic">
                                        {
                                            totalLoader ?
                                                <div>
                                                    <div>Recovered</div>
                                                    <div className="qvdc_nm">{totals.TotalRecovered}</div>
                                                </div> :
                                                <LoaderComponent />}


                                    </div>
                                    <div className="qdvc_ic">
                                        {
                                            totalLoader ?
                                                <div>
                                                    <div>Deaths</div>
                                                    <div className="qvdc_nm">{totals.TotalDeaths}</div>
                                                </div> :
                                                <LoaderComponent />}

                                    </div>
                                    <div className="qdvc_ic">   {
                                        totalLoader ?
                                            <div>
                                                <div>Confirmed</div>
                                                <div className="qvdc_nm">{totals.TotalConfirmed}</div>
                                            </div> :
                                            <LoaderComponent />}
                                    </div>
                                </div>
                            </div>

                        }

                    </div>
            </>
        )
    }
}
