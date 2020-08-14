import * as d3 from 'd3'

export const CountrySummaryMultiLineChart = {
    multiLineChart
}

function multiLineChart(newCountry1Data, newCountry2Data, newCountry3Data, type, id) {

    d3.selectAll(`#${id} > *`).remove();

    const height = document.documentElement.clientHeight * 0.3;
    const width = document.documentElement.clientWidth * 0.7;
    const svg = d3.select(`#${id}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let xData = '';
    if (newCountry1Data.length !== 0) {
        xData = newCountry1Data;
    } else if (newCountry2Data.length !== 0) {
        xData = newCountry2Data;
    } else if (newCountry3Data.length !== 0) {
        xData = newCountry3Data;
    }

    const dataDisplayLengthForX = d3.max([newCountry1Data.length, newCountry2Data.length, newCountry3Data.length]);


    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, (dataDisplayLengthForX - 1)]);

    /* Providing label aat y axis scale */
    if (xData !== '') {

        /* Defining min val for y axis */
        const minVal = d3.min([d3.min(newCountry1Data, d => d[type]),
        d3.min(newCountry2Data, d => d[type]),
        d3.min(newCountry3Data, d => d[type])]);

        /* Defining max val for y axis */
        const maxVal = d3.max([d3.max(newCountry1Data, d => d[type]),
        d3.max(newCountry2Data, d => d[type]),
        d3.max(newCountry3Data, d => d[type])]);

        /* Defining ranges for y scale */
        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([minVal, maxVal]);


        /* Defining ranges and format for y scale */
        const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(''));
        console.log('yAxis ', yAxis)

        /* Providing label aat y axis scale */
        svg.append('g')
            .style('transform', `translateX(0)`)
            .call(yAxis)
            .attr('fill', '#2a5171')
            .selectAll('text')
            .attr('fill', '#a50404')

        /* Generating lines */
        const line = d3.line()
            .x((d, i) => xScale(i))
            .y((d, i) => yScale(d[type]))
            .curve(d3.curveMonotoneX);

        /* Curve of country 1 */
        let path1 = '';
        if (newCountry1Data.length !== 0) {
            path1 = svg.append('path')
                .datum(newCountry1Data)
                .attr('fill', 'none')
                .attr('stroke', 'royalblue')
                .attr('stroke-width', 3)
                .attr('d', line)

        }

        /* Curve of country 2 */
        let path2 = '';
        if (newCountry2Data.length !== 0) {
            path2 = svg.append('path')
                .datum(newCountry2Data)
                .attr('fill', 'none')
                .attr('stroke', 'brown')
                .attr('stroke-width', 3)
                .attr('d', line)
        }

        /* Curve of country 3 */
        let path3 = '';
        if (newCountry3Data.length !== 0) {
            path3 = svg.append('path')
                .datum(newCountry3Data)
                .attr('fill', 'none')
                .attr('stroke', 'orchid')
                .attr('stroke-width', 3)
                .attr('d', line)
        }


        /* x Label */
        svg.append('text')
            .text(type)
            .attr('x', (width / 2) - 40)
            .attr('y', height + 100)
            .attr('fill', 'aliceblue')

        /* y Label */
        svg.append('text')
            .text('Total Lives')
            .attr('x', -height + 80)
            .attr('y', -50)
            .style('transform', 'rotate(-90deg)')
            .style('textAnchor', 'middle')
            .attr('fill', 'aliceblue')


        /* Legend for country1 */
        if (newCountry1Data.length !== 0) {
            svg.append('circle')
                .attr('cx', 10)
                .attr('cy', -55)
                .attr('r', 5)
                .style('fill', 'royalblue')
                .style('cursor', 'pointer');

            svg.append('text')
                .text(newCountry1Data[0].Country)
                .attr('class', 'legend1')
                .attr('x', 20)
                .attr('y', -50)
                .attr('fill', 'royalblue')
                .on('mouseover', () => (
                    path1.attr('stroke', 'crimson')
                ))
                .on('mouseout', () => (
                    path1.attr('stroke', 'royalblue')
                ))
        }

        /* Legend for country2 */
        if (newCountry2Data.length !== 0) {
            svg.append('circle')
                .attr('cx', 10)
                .attr('cy', -35)
                .attr('r', 5)
                .style('fill', 'brown')
                .style('cursor', 'pointer');

            svg.append('text')
                .attr('class', 'legend1')
                .text(newCountry2Data[0].Country)
                .attr('x', 20)
                .attr('y', -30)
                .attr('fill', 'brown')
                .on('mouseover', () => (
                    path2.attr('stroke', 'crimson')
                ))
                .on('mouseout', () => (
                    path2.attr('stroke', 'brown')
                ))
        }

        /* Legend for country3 */
        if (newCountry3Data.length !== 0) {
            svg.append('circle')
                .attr('cx', 10)
                .attr('cy', -15)
                .attr('r', 5)
                .style('fill', 'orchid')
                .style('cursor', 'pointer');

            svg.append('text')
                .attr('class', 'legend1')
                .text(newCountry3Data[0].Country)
                .attr('x', 20)
                .attr('y', -10)
                .attr('fill', 'orchid')
                .on('mouseover', () => (
                    path3.attr('stroke', 'crimson')
                ))
                .on('mouseout', () => (
                    path3.attr('stroke', 'orchid')
                ))
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


        // circles1.on('mouseover', function (d) { return mouseover(d) })
        // circles1.on('mousemove', function (d) { return mousemove() })
        // circles1.on('mouseout', function (d) { return mouseout() });

        // circles2.on('mouseover', function (d) { return mouseover(d) })
        // circles2.on('mousemove', function (d) { return mousemove() })
        // circles2.on('mouseout', function (d) { return mouseout() });

        // circles3.on('mouseover', function (d) { return mouseover(d) })
        // circles3.on('mousemove', function (d) { return mousemove() })
        // circles3.on('mouseout', function (d) { return mouseout() });

        // function mouseover(d) {

        //     return tooltip.style('visibility', 'visible').style('top', (d3.event.pageY) + 'px')
        //         .style('left', d3.event.pageX + 'px').html(
        //             `
        //                         <div>
        //                             <b>${d.Country}</b>
        //                             <div><small>${type}: ${d[type]}</small></div>
        //                         </div>
        //                     `
        //         );

        // }


        // function mousemove() {
        //     return tooltip.style('top', (d3.event.pageY) + 'px')
        //         .style('left', d3.event.pageX + 'px').style('visibility', 'visible');
        // }

        // function mouseout() {
        //     return tooltip.style('visibility', 'hidden');
        // }
    }
}