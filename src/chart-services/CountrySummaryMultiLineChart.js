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
        const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));

        /* Providing label aat y axis scale */
        svg.append('g')
            .style('transform', `translateX(0)`)
            .call(yAxis)
            .attr('fill', 'none')
            .selectAll('text')
            .attr('fill', '#a50404');


        let i = 0;
        let plottableDataBar1 = newCountry1Data.slice(0, 1);
        let plotLength1 = newCountry1Data.length;
        let plottableDataBar2 = newCountry2Data.slice(0, 1);
        let plotLength2 = newCountry2Data.length;
        let plottableDataBar3 = newCountry3Data.slice(0, 1);
        let plotLength3 = newCountry3Data.length;


        /* Curve of country 3 */
        if (newCountry1Data.length !== 0) {
            move1();
        }

        /* Curve of country 3 */
        if (newCountry2Data.length !== 0) {
            move2();
        }


        /* Curve of country 3 */
        if (newCountry3Data.length !== 0) {
            move3();
        }

        function move1() {

            setTimeout(() => {
                plottableDataBar1 = newCountry1Data.slice(0, i);
                /* Generating lines */
                const line = d3.line()
                    .x((d, i) => xScale(i))
                    .y((d, i) => yScale(d[type]))
                    .curve(d3.curveMonotoneX);


                /* Curve of country 1 */
                svg.append('path')
                    .datum(plottableDataBar1)
                    .attr('fill', 'none')
                    .attr('stroke', 'darkgreen')
                    .attr('stroke-width', 4)
                    .attr('d', line)
                // .attrTween("d", function (d) {
                //     return pathTween(line(d), 4, this)()
                // });



                if (i < plotLength1) {
                    i++;
                    move1();
                }

            }, 100);

        }

        function move2() {

            setTimeout(() => {
                plottableDataBar2 = newCountry2Data.slice(0, i);
                /* Generating lines */
                const line = d3.line()
                    .x((d, i) => xScale(i))
                    .y((d, i) => yScale(d[type]))
                    .curve(d3.curveMonotoneX);

                /* Curve of country 2 */
                svg.append('path')
                    .datum(plottableDataBar2)
                    .attr('fill', 'none')
                    .attr('stroke', 'brown')
                    .attr('stroke-width', 4)
                    .attr('d', line)
                // .attrTween("d", function (d) {
                //     return pathTween(line(d), 4, this)()
                // });


                if (i < plotLength2) {
                    i++;
                    move2();
                }

            }, 30);


        }


        function move3() {
            setTimeout(() => {
                plottableDataBar3 = newCountry3Data.slice(0, i);

                /* Generating lines */
                const line = d3.line()
                    .x((d, i) => xScale(i))
                    .y((d, i) => yScale(d[type]))
                    .curve(d3.curveMonotoneX);

                svg.append('path')
                    .datum(plottableDataBar3)
                    .attr('fill', 'none')
                    .attr('stroke', 'darkblue')
                    .attr('stroke-width', 4)
                    .attr('d', line)
                // .attrTween("d", function (d) {
                //     return pathTween(line(d), 4, this)()
                // });


                if (i < plotLength3) {
                    i++;
                    move3();
                }
            }, 30)


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
                .style('fill', 'darkgreen')
                .style('cursor', 'pointer');

            svg.append('text')
                .text(newCountry1Data[0].Country)
                .attr('class', 'legend1')
                .attr('x', 20)
                .attr('y', -50)
                .attr('fill', 'darkgreen')
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
                .attr('fill', 'brown');
        }

        /* Legend for country3 */
        if (newCountry3Data.length !== 0) {
            svg.append('circle')
                .attr('cx', 10)
                .attr('cy', -15)
                .attr('r', 5)
                .style('fill', 'darkblue')
                .style('cursor', 'pointer');

            svg.append('text')
                .attr('class', 'legend1')
                .text(newCountry3Data[0].Country)
                .attr('x', 20)
                .attr('y', -10)
                .attr('fill', 'darkblue');
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


    }
}