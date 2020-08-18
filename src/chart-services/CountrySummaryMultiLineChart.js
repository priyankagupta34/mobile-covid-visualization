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


    function pathTween(d1, precision, self) {
        return function () {
            var path0 = self,
                path1 = path0.cloneNode(),
                n0 = path0.getTotalLength(),
                n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

            // Uniform sampling of distance based on specified precision.
            var distances = [0],
                i = 0,
                dt = precision / Math.max(n0, n1);
            while ((i += dt) < 1) distances.push(i);
            distances.push(1);

            // Compute point-interpolators at each distance.
            var points = distances.map(function (t) {
                var p0 = path0.getPointAtLength(t * n0),
                    p1 = path1.getPointAtLength(t * n1);
                return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
            });

            return function (t) {
                return t < 1 ? "M" + points.map(function (p) {
                    return p(t);
                }).join("L") : d1;
            };
        };
    }


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
            .attr('fill', '#a50404')

        /* Generating lines */
        const line = d3.line()
            .x((d, i) => xScale(i))
            .y((d, i) => yScale(d[type]))
            .curve(d3.curveMonotoneX);

        /* Curve of country 1 */
        if (newCountry1Data.length !== 0) {
            svg.append('path')
                .datum(newCountry1Data)
                .transition()
                .duration(600)
                .attr('fill', 'none')
                .attr('stroke', 'darkgreen')
                .attr('stroke-width', 4)
                // .attr('d', line)
                .attrTween("d", function (d) {
                    return pathTween(line(d), 4, this)()
                });

        }

        /* Curve of country 2 */
        if (newCountry2Data.length !== 0) {
            svg.append('path')
                .datum(newCountry2Data)
                .transition()
                .duration(700)
                .attr('fill', 'none')
                .attr('stroke', 'brown')
                .attr('stroke-width', 4)
                // .attr('d', line)
                .attrTween("d", function (d) {
                    return pathTween(line(d), 4, this)()
                });
        }

        /* Curve of country 3 */
        if (newCountry3Data.length !== 0) {
            svg.append('path')
                .datum(newCountry3Data)
                .transition()
                .duration(1000)
                .attr('fill', 'none')
                .attr('stroke', 'darkblue')
                .attr('stroke-width', 4)
                // .attr('d', line)
                .attrTween("d", function (d) {
                    return pathTween(line(d), 4, this)()
                });
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