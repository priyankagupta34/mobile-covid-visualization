import React, { Component } from 'react';
import './SearchDetailedComponent.css';

export default class SearchDetailedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOrDistrictSelected: '',
            displayShower: true
        }
    }
    componentDidMount() {
        const nameList = ["Puducherry", "Nicobar", "Kashmir",
            "Madhepura", "Nicobar", "Lakshadweep", "Telangana", "Nicobar", "Lakshadweep", "Sikkim"];
        const randowm = Math.floor(Math.random() * 10);
        const name = nameList[randowm];
        this.nameLooper(name, 0);
    }

    nameLooper(name, i) {

        const nameArray = name.split("");
        if (i <= nameArray.length) {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    stateOrDistrictSelected: nameArray.slice(0, i + 1).join("")
                })
                i++;
                this.nameLooper(name, i);
            }, 100);

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

    clearTheInputRow(){
        this.setState({
            ...this.state,
            stateOrDistrictSelected: ''
        })
    }

    hideDisplayInputShow() {

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
                                onChange={this.filterStateDistrictHandler.bind(this)}
                                onClick={this.clearTheInputRow.bind(this)}
                                ></input>
                            <div onClick={this.clearNCloseSearch.bind(this)} className="times">&times;</div>
                        </div>

                        <div className="searchDisplayer">
                            <div>
                                {searchList.length !== 0 && <div className="searchBox">
                                    {searchList.map((item, index) => (
                                        <div key={index} className="eachPlaceDisplay" onClick={() => this.props.provideDataOfPlace(item)}>
                                            <div className="place_spc">
                                                {item.place}
                                            </div>
                                            <div className="code_spc">
                                                {item.code}
                                                <i className="material-icons codeArrow">arrow_circle_down</i>
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
