import * as d3 from 'd3';
import React, { Component } from 'react';
import { LimitServices } from '../../services/LimitServices';
import TitleIconComponent from '../title-icon-component/TitleIconComponent';
import './TopFiveCategoryComponent.css';

export default class TopFiveCategoryComponent extends Component {


    drawNewDeathChartForCurrent(data, sliceLength, type) {
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
            .attr('rx', 3)


        /* Adding data over the bars for better visual effects */
        svg.selectAll('text')
            .data(newDataSet)
            .enter()
            .append('text')
            .attr('class', 'tx_mn')
            .text(d => `${LimitServices.abbreviateIntToReadableString(d[type])}`)
            .attr('dx', (d, i) => xScale(i))
            .attr('dy', (d, i) => yScale(d[type]) - 10)
            .style('fill', '#a50404')

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
        this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, 10, 'NewConfirmed');
    }

    componentDidUpdate() {
        this.drawNewDeathChartForCurrent(this.props.summaryDataCountries, 10, 'NewConfirmed');
    }
    render() {
        return (
            <div>
                <TitleIconComponent icon={'stairs'} title="World's Most"/>
                <div id="cov_1"></div>
            </div>
        )
    }
}
