import * as d3 from 'd3';
import React, { Component } from 'react';
import { LimitServices } from '../../services/LimitServices';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';
import './TopChartComponent.css';

export default class TopChartComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topData: 'top10',
            eventData: 'NewConfirmed'
        }
        this.resizingWindowHandler = this.resizingWindowHandler.bind(this);
    }


    drawNewDeathChartForCurrent(data, sliceLength, type) {
        if (sliceLength === 'top10') {
            sliceLength = 10;
        }
        if (sliceLength === 'top15') {
            sliceLength = 15;
        }
        if (sliceLength === 'top20') {
            sliceLength = 20;
        }
        let slice = 40;
        let newDataSet = [];
        newDataSet = LimitServices.sortTopLivesInEvents(data, type, sliceLength);
        if (slice > newDataSet.length) {
            slice = newDataSet.length
        }
        d3.selectAll("#cov_1 > *").remove();
        
        const height = document.documentElement.clientHeight * 0.3;
        const width = document.documentElement.clientWidth * 0.7;

        newDataSet = newDataSet.slice(0, slice);

        const transition = d3.transition()
            .duration(500);

        const xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, slice - 1]);


        const yScale = d3.scaleLinear()
            .domain([d3.min(newDataSet, d => d[type]), d3.max(newDataSet, d => d[type]) + 10])
            .range([height, 0]);

        const svg = d3.select("#cov_1")
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        /* Creating rectangle bars here */
        const bars = svg.selectAll('rect')
            .data(newDataSet)
            .enter()
            .append('rect');


        /* Display rectangle bars here */
        bars.transition(transition)
            .delay(function (d, i) { return 30 * i; })
            .attr('x', (d, i) => xScale(i))
            .attr('y', (d, i) => yScale(d[type]))
            .attr('width', 10)
            .attr('height', (d, i) => height - yScale(d[type]))
            .attr('fill', (d, i) => '#a50404')
        // .attr('rx', 3)


        if (sliceLength === 10) {  /* Adding data over the bars for better visual effects */
            svg.selectAll('text')
                .data(newDataSet)
                .enter()
                .append('text')
                .attr('class', 'tx_mn')
                .text(d => `${LimitServices.abbreviateIntToReadableString(d[type])}`)
                .attr('dx', (d, i) => xScale(i))
                .attr('dy', (d, i) => yScale(d[type]) - 10)
                .style('fill', '#a50404')
        }
        /*  gridlines in x axis function */
        function make_x_gridlines() {
            return d3.axisBottom(xScale)
                .ticks(10)
        }

        /* gridlines in y axis function */
        function make_y_gridlines() {
            return d3.axisLeft(yScale)
                .ticks(10)
        }

        /* add the X gridlines */
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_gridlines()
                .tickSize(-height)
            )

        /* add the Y gridlines */
        svg.append("g")
            .attr("class", "grid")
            .call(make_y_gridlines()
                .tickSize(-width)
            )



        /* Adding y axis with formating data over */
        const yAxis = d3.axisLeft(yScale);
        svg.selectAll('g')
            .data(newDataSet)
            .enter()
            .append('g')
            .style("transform", `translateX(${0}px)`)
            .call(yAxis)
            // .attr('fill', '#a50404')
            .selectAll('text')
            .style('fill', '#a50404')

        /* Adding x axis with formating data over */
        const xAxis = d3.axisBottom(xScale).ticks(slice - 1);
        svg.append('g')
            .style("transform", `translate(0,${height}px)`)
            .call(xAxis)
            .attr('fill', '#a50404')
            .selectAll('text')
            .data(newDataSet)
            .text(d => d.Country)
            .attr("y", 0)
            .attr("x", 9)
            .style("transform", "rotate(54deg)")
            .style("text-anchor", "start")
            .style('fill', '#a50404');

    }
    componentDidMount() {
        window.addEventListener('resize', this.resizingWindowHandler, false);
    }

    componentDidUpdate(prev) {
        if (prev !== this.props) {
            this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, this.state.topData, this.state.eventData);
        }
    }

    resizingWindowHandler(event) {
        this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, this.state.topData, this.state.eventData);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizingWindowHandler, false);
    }

    changeEventDataHandler(e) {
        this.setState({
            ...this.state,
            eventData: e.target.value
        }, () => {
            this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, this.state.topData, this.state.eventData);
        })
    }

    changeTopDataHandler(e) {
        this.setState({
            ...this.state,
            topData: e.target.value
        }, () => {
            this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, this.state.topData, this.state.eventData);
        })
    }
    render() {
        const { topData, eventData } = this.state;
        return (
            <div className="top_content_viw">
                <TitleIconComponent icon={'stairs'} title="World's Most" />
                <div className="main_lastUpdt">Select a combination from below</div>
                <div className="vhpadtopbot1 flexCenterX">
                    <select className='input_ser' onChange={this.changeTopDataHandler.bind(this)} value={topData}>
                        <option value="top10">Top 10</option>
                        <option value="top15">Top 15</option>
                        <option value="top20">Top 20</option>
                    </select>
                    <select className='input_ser' onChange={this.changeEventDataHandler.bind(this)} value={eventData} >
                        <option value="NewConfirmed">New Confirmed</option>
                        <option value="NewDeaths">New Deaths</option>
                        <option value="NewRecovered">New Recovered</option>
                        <option value="TotalConfirmed">Total Confirmed</option>
                        <option value="TotalDeaths">Total Deaths</option>
                        <option value="TotalRecovered">Total Recovered</option>
                    </select>
                </div>

                <div id="cov_1"></div>
            </div>
        )
    }
}
