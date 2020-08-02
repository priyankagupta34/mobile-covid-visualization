import React, { Component } from 'react'

export default class QuickDataViewComponent extends Component {
    componentDidMount(){

    }
    render() {
        const {totals} = this.props;
        console.log('totals ', totals);
        return (
            <div>
                
            </div>
        )
    }
}
