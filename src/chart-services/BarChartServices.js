import * as d3 from 'd3';
import { LimitServices } from '../services/LimitServices';


export const BarChartServices = {
    creatingBarChart
}

function creatingBarChart(id, data, event) {

    const cloneDate = Object.assign([], data);
    const plottableData = cloneDate.reverse().slice(0, 7).reverse();

    d3.selectAll(`#${id} > *`).remove();

    const height = document.documentElement.clientHeight * 0.1;
    const width = document.documentElement.clientWidth * 0.7;


    const transition = d3.transition()
        .duration(100);

    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, plottableData.length]);

    let plotPower = d3.min(plottableData, d => d[event]).toString().length;
    let minusDate = 0;
    if (plotPower > 2) {
        minusDate = Math.pow(10, plotPower - 2);
    }
    const yScale = d3.scaleLinear()
        .domain([d3.min(plottableData, d => d[event]) - minusDate, d3.max(plottableData, d => d[event])])
        .range([height, 0]);

    const svg = d3.select(`#${id}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);


    let plottableDataBar = plottableData.slice(0, 1);
    let plotLength = plottableData.length;

    let i = 0;
    move();
    function move() {
        if (i < plotLength) {
            setTimeout(() => {
                plottableDataBar = plottableData.slice(0, i);
                const bars = svg.selectAll('rect')
                    .data(plottableDataBar)
                    .enter()
                    .append('rect');

                /* Display rectangle bars here */
                bars
                    .transition(transition)
                    // .delay(function (d, i) { return 30 * i; })
                    .attr('x', (d, i) => xScale(i))
                    .attr('y', (d, i) => yScale(d[event]))
                    .attr('class', `${event}BG`)
                    .attr('width', 20)
                    .attr('height', (d, i) => height - yScale(d[event]))
                move();
            }, 100);
            i++;

        }
    }



    /* Adding data over the bars for better visual effects */
    svg.selectAll('.maq1')
        .data(plottableData)
        .enter()
        .append('text')
        .attr('class', `tx_mn ${event}Co`)
        .text(d => `${LimitServices.inLakhsOrCrores(Number(d[event]))}`)
        .attr('dx', (d, i) => xScale(i))
        .attr('dy', (d, i) => yScale(d[event]) - 10)

    /* Adding data over the bars for better visual effects delta data */
    svg.selectAll('.maq1')
        .data(plottableData)
        .enter()
        .append('text')
        .attr('class', `tx_mn light${event}BG`)
        .text(d => {
            if(Number(d[`delta${event}`]) !== 0){
               return `+${LimitServices.inLakhsOrCrores(Number(d[`delta${event}`]))}`;
            }
        })
        .attr('dx', (d, i) => xScale(i))
        .attr('dy', (d, i) => yScale(d[event]) - 30)


    /* Adding data below the bars for better visual effects For Date */
    svg.selectAll('.maq2')
        .data(plottableData)
        .enter()
        .append('text')
        .attr('class', `tx_mn ${event}Co`)
        .text(d => `${new Date(d.date).toDateString().split(" ").slice(1, 3)[1]}`)
        .attr('dx', (d, i) => xScale(i) + 5)
        .attr('dy', (d, i) => height + 20)

    /* Adding data below the bars for better visual effects For Month*/
    svg.selectAll('.maq2')
        .data(plottableData)
        .enter()
        .append('text')
        .attr('class', `tx_mn ${event}Co`)
        .text(d => `${new Date(d.date).toDateString().split(" ").slice(1, 3)[0]}`)
        .attr('dx', (d, i) => xScale(i))
        .attr('dy', (d, i) => height + 30);



}