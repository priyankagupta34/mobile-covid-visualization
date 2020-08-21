import * as d3 from 'd3'

export const LineChartServices = {
    singleLineChart
}


function singleLineChart(id, data, event, lineColor) {
    const cloneDate = Object.assign([], data);
    const dataLength = cloneDate.length;
    let slicingData = 1;
    if (dataLength >= 40) {
        slicingData = Math.ceil(Math.acosh(dataLength));
    } else {
        slicingData = 1;
    }
    let plottableData = [];
    for (let i = 0; i < dataLength; i++) {
        if (i % slicingData === 0) {
            plottableData.push(cloneDate[i]);
        }
    }
    plottableData.push(cloneDate[dataLength - 1]);
    const height = document.documentElement.clientHeight * 0.04;
    const width = document.documentElement.clientWidth * 0.16;

    d3.selectAll(`#${id} > *`).remove();
    const svg = d3.select(`#${id}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, (plottableData.length - 1)]);
    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([d3.min(plottableData, (d) => d[event]), d3.max(plottableData, (d) => d[event])]);

    let i = 0;
    let plottableDataBar = plottableData.slice(0, 1);
    let plotLength = plottableData.length;
    move();
    function move() {

        setTimeout(() => {
            plottableDataBar = plottableData.slice(0, i);

            const line = d3.line()
                .x((d, i) => xScale(i))
                .y((d, i) => yScale(d[event]))
                .curve(d3.curveMonotoneX);


            svg.append('path')
                .datum(plottableDataBar)
                .attr("fill", "none")
                .attr("stroke", lineColor)
                .attr("stroke-width", 1)
                .attr("d", line)



            if (i < plotLength) {
                i++;
                move();
            }
        }, 35);


    }
}


