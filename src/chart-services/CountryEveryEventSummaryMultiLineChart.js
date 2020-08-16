import * as d3 from 'd3';

export const CountryEveryEventSummaryMultiLineChart = {
    vividMultiLineChart
}

function vividMultiLineChart(id, data, type) {
    let cloneData = Object.assign([], data);
    cloneData = cloneData.reverse();
    let newData = [];
    let days = 1;
    if (type === 'weekly') {
        days = 7;
        for (let i = 0; i < cloneData.length; i++) {
            if (i % days === 0) {
                newData.push(cloneData[i]);
            }
        }
        newData = newData.reverse();

    } else if (type === 'monthly') {
        days = 30;
        for (let i = 0; i < cloneData.length; i++) {
            if (i % days === 0) {
                newData.push(cloneData[i]);
            }
        }
        newData = newData.reverse();
    } else if (type === 'cumulative') {
        newData = data;
    } else if (type === 'lastweek') {
        newData = cloneData.slice(0, 7);
        newData = newData.reverse();
    }

    const colorRecov = 'darkgreen', colorActive = 'darkred', colorConfirmed = 'darkblue', colorDeath = 'darkorange';
    const minVal = d3.min([
        d3.min(newData, d => d['Recovered']),
        d3.min(newData, d => d['Active']),
        d3.min(newData, d => d['Confirmed']),
        d3.min(newData, d => d['Deaths'])
    ]);

    const maxVal = d3.max([
        d3.max(newData, d => d['Recovered']),
        d3.max(newData, d => d['Active']),
        d3.max(newData, d => d['Confirmed']),
        d3.max(newData, d => d['Deaths'])
    ]);

    d3.selectAll(`#${id} > *`).remove();
    const height = document.documentElement.clientHeight * 0.3;
    const width = document.documentElement.clientWidth * 0.7;

    const svg = d3.select(`#${id}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    /* Defining ranges for y scale */
    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([minVal, maxVal]);

    /* Defining ranges and format for x scale */
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));

    /* Defining ranges for x scale */
    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, (newData.length - 1)]);

    /* Defining ranges and format for x scale */
    const xAxis = d3.axisBottom(xScale).ticks(newData.length - 1);

    /* Now attaching x-scale in svg */
    if(type !== 'cumulative'){ 
        svg.append('g')
            .style('transform', `translateY(${height}px)`)
            .call(xAxis)
            .attr('fill', '#2a5171')
            .selectAll('text')
            .data(newData)
            .text(d => new Date(d['Date']).toDateString().split(" ").slice(1,3).join(" "))
            .style('transform', 'rotate(54deg)')
            .style('text-anchor', 'start')
            .attr('class', 'smallDateInfo')
            .attr('fill', '#a50404');
        }

    /* Now attaching y-scale in svg */
    svg.append('g')
        .style('transform', `translateX(0)`)
        .call(yAxis)
        .attr('fill', '#2a5171')
        .selectAll('text')
        .attr('fill', '#a50404');

    /* Generating line for Recovered */
    const lineRecovered = d3.line()
        .x((d, i) => xScale(i))
        .y((d, i) => yScale(d['Recovered']))
        .curve(d3.curveMonotoneX);

    /* Generating line for Active */
    const lineActive = d3.line()
        .x((d, i) => xScale(i))
        .y((d, i) => yScale(d['Active']))
        .curve(d3.curveMonotoneX);

    /* Generating line for Confirmed */
    const lineConfirmed = d3.line()
        .x((d, i) => { console.log("dh"); return xScale(i); })
        .y((d, i) => yScale(d['Confirmed']))
        .curve(d3.curveMonotoneX);

    /* Generating line for Deaths */
    const lineDeaths = d3.line()
        .x((d, i) => xScale(i))
        .y((d, i) => yScale(d['Deaths']))
        .curve(d3.curveMonotoneX);

    svg.append('path')
        .datum(newData)
        .attr("class", "line")
        .attr('fill', 'none')
        .attr('stroke', colorRecov)
        .attr('stroke-width', 3)
        .attr('d', lineRecovered);

    svg.append('path')
        .datum(newData)
        .attr("class", "line")
        .attr('fill', 'none')
        .attr('stroke', colorActive)
        .attr('stroke-width', 3)
        .attr('d', lineActive);

    svg.append('path')
        .datum(newData)
        .attr("class", "line")
        .attr('fill', 'none')
        .attr('stroke', colorConfirmed)
        .attr('stroke-width', 3)
        .attr('d', lineConfirmed);

    svg.append('path')
        .datum(newData)
        .attr("class", "line")
        .attr('fill', 'none')
        .attr('stroke', colorDeath)
        .attr('stroke-width', 3)
        .attr('d', lineDeaths);



    /* Legend for recovered */
    svg.append('circle')
        .attr('cx', 10)
        .attr('cy', -55)
        .attr('r', 5)
        .style('fill', colorRecov)
        .style('cursor', 'pointer');

    svg.append('text')
        .text('Recovered')
        .attr('class', 'legend1')
        .attr('x', 20)
        .attr('y', -50)
        .attr('fill', colorRecov)

    /* Legend for active */
    svg.append('circle')
        .attr('cx', 10)
        .attr('cy', -40)
        .attr('r', 5)
        .style('fill', colorActive)
        .style('cursor', 'pointer');

    svg.append('text')
        .text('Active')
        .attr('class', 'legend1')
        .attr('x', 20)
        .attr('y', -35)
        .attr('fill', colorActive);

    /* Legend for Confirmed */
    svg.append('circle')
        .attr('cx', 10)
        .attr('cy', -25)
        .attr('r', 5)
        .style('fill', colorConfirmed)
        .style('cursor', 'pointer');

    svg.append('text')
        .text('Confirmed')
        .attr('class', 'legend1')
        .attr('x', 20)
        .attr('y', -20)
        .attr('fill', colorConfirmed);

    /* Legend for Deaths */
    svg.append('circle')
        .attr('cx', 10)
        .attr('cy', -70)
        .attr('r', 5)
        .style('fill', colorDeath)
        .style('cursor', 'pointer');

    svg.append('text')
        .text('Deaths')
        .attr('class', 'legend1')
        .attr('x', 20)
        .attr('y', -65)
        .attr('fill', colorDeath);





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
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(0,' + height + ')')
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )

    /* add the Y gridlines */
    svg.append('g')
        .attr('class', 'grid')
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )
}