import React, { Component } from 'react'
import './CDCInfoComponent.css'
import TitleIconComponent from '../title-icon-component/TitleIconComponent'

export default class CDCInfoComponent extends Component {
    render() {
        return (
            <div>

                <TitleIconComponent icon="attach_file" title="CDC Guidline" />
                <div className="main_lastUpdt">
                    Download below available pdf files by
                    </div>
                <div className="main_lastUpdt">
                    <font color="darkblue">
                        <small>Centers of Disease Control and Prevention</small>
                    </font>
                </div>
                <div className="boxCompoForCDC">
                    <ul>
                        <li>How to Protect Yourself and Others <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention-H.pdf" download>
                            <i className="material-icons material-icons-outlined fontSize1">download</i>
                        </a></li>
                        <li>What you should know about COVID-19 to protect yourself and others <a href="https://www.cdc.gov/coronavirus/2019-ncov/downloads/2019-ncov-factsheet.pdf" download>
                            <i className="material-icons material-icons-outlined fontSize1">download</i>
                        </a></li>
                        <li>What to do if you are sick with 2019 Novel Coronavirus <a href="https://www.cdc.gov/coronavirus/2019-ncov/downloads/sick-with-2019-ncov-fact-sheet.pdf" download>
                            <i className="material-icons material-icons-outlined fontSize1">download</i>
                        </a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
