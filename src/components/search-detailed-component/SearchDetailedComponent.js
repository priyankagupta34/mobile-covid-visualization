import React, { Component } from 'react';
import './SearchDetailedComponent.css';

export default class SearchDetailedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOrDistrictSelected: ''
        }
    }
    filterStateDistrictHandler(event) {
        this.setState({
            ...this.state,
            stateOrDistrictSelected: event.target.value
        }, () => {
            this.props.filterStateDistrictHandler(this.state.stateOrDistrictSelected);
        })
    }
    clearNCloseSearch() {
        this.setState({
            ...this.state,
            stateOrDistrictSelected: ''
        })
        this.props.clearNCloseSearch();
    }
    render() {
        const { stateOrDistrictSelected } = this.state;
        const { searchList } = this.props;
        return (
            <div>
                <div className="dfdetails">
                    <div className="absoluteWrapper">
                        <div className="input_search">
                            <input value={stateOrDistrictSelected}
                                className="insideInput"
                                onChange={this.filterStateDistrictHandler.bind(this)}></input>
                            <div onClick={this.clearNCloseSearch.bind(this)} className="times">&times;</div>
                        </div>
                        <div className="searchDisplayer">
                            <div>
                                {searchList.length !== 0 && <div className="searchBox">
                                    {searchList.map((item, index) => (
                                        <div key={index} className="eachPlaceDisplay">
                                            <div className="place_spc">
                                                {item.place}
                                            </div>
                                            <div className="code_spc">
                                                {item.code}
                                                <i className="material-icons fontSize1">arrow_forward</i>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
