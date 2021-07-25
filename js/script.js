jQuery(function($){

/*
March 2020 - 3
April 2020 - 30
May 2020 - 31
June 2020 = 30
July 2020 - 31
August 2020 - 31
September 2020 - 30
October 2020 - 31
November 2020 - 30
December 2020 - 31
January 2021 - 31
Febraury 2021 - 28
March 2021 - 31
April 2021 - 30
May 2021 - 31
June 2021 - 30
July 2021 - 3

Total Days = 462
Data Points = 32
Interval = 14.4375
*/

  var upstreamData = [
    {"day": 1, "growth": 0},
    {"day": 28, "growth": 27.7}, // + 28
    {"day": 42.4375, "growth": 34},
    {"day": 56.875, "growth": 34.3},
    {"day": 71.3125, "growth": 31.1},
    {"day": 85.75, "growth": 30},
    {"day": 100.1875, "growth": 25.1},
    {"day": 114.625, "growth": 23.6},
    {"day": 129.0625, "growth": 22.1},
    {"day": 143.5, "growth": 23.6},
    {"day": 157.9375, "growth": 25.6},
    {"day": 172.375, "growth": 27.1},
    {"day": 186.8125, "growth": 31.5},
    {"day": 201.25, "growth": 37.1},
    {"day": 215.6875, "growth": 37.3},
    {"day": 230.125, "growth": 39.1},
    {"day": 244.5625, "growth": 42.9},
    {"day": 259, "growth": 49.1},
    {"day": 273.4375, "growth": 53.5},
    {"day": 287.875, "growth": 55.8},
    {"day": 302.3125, "growth": 44.7},
    {"day": 316.75, "growth": 56.2},
    {"day": 331.1875, "growth": 57.2},
    {"day": 345.625, "growth": 57.9},
    {"day": 360.0625, "growth": 54.8},
    {"day": 374.5, "growth": 53.4},
    {"day": 388.9375, "growth": 51.7},
    {"day": 403.375, "growth": 49.4},
    {"day": 417.8125, "growth": 51.7},
    {"day": 432.25, "growth": 51.1},
    {"day": 446.6875, "growth": 49.8},
    {"day": 461.125, "growth": 49.5},
    {"day": 475.5625, "growth": 49},
    {"day": 490, "growth": 47.7}
  ];

  var downstreamData = [
    {"day": 1, "growth": 0},
    {"day": 28, "growth": 20.1},
    {"day": 42.4375, "growth": 20},
    {"day": 56.875, "growth": 16.2},
    {"day": 71.3125, "growth": 12.2},
    {"day": 85.75, "growth": 16.1},
    {"day": 100.1875, "growth": 6.6},
    {"day": 114.625, "growth": 9.7},
    {"day": 129.0625, "growth": 14.3},
    {"day": 143.5, "growth": 9.4},
    {"day": 157.9375, "growth": 17.4},
    {"day": 172.375, "growth": 14.3},
    {"day": 186.8125, "growth": 13.7},
    {"day": 201.25, "growth": 14.2},
    {"day": 215.6875, "growth": 15.1},
    {"day": 230.125, "growth": 16.3},
    {"day": 244.5625, "growth": 26.1},
    {"day": 259, "growth": 27.4},
    {"day": 273.4375, "growth": 30},
    {"day": 287.875, "growth": 32.6},
    {"day": 302.3125, "growth": 34.7},
    {"day": 316.75, "growth": 31.8},
    {"day": 331.1875, "growth": 28.6},
    {"day": 345.625, "growth": 29.8},
    {"day": 360.0625, "growth": 30.8},
    {"day": 374.5, "growth": 25.7},
    {"day": 388.9375, "growth": 25.5},
    {"day": 403.375, "growth": 28.5},
    {"day": 417.8125, "growth": 31.9},
    {"day": 432.25, "growth": 28.9},
    {"day": 446.6875, "growth": 24.5},
    {"day": 461.125, "growth": 24.6},
    {"day": 475.5625, "growth": 26.6},
    {"day": 490, "growth": 25.1}
  ];

  var dataLabels = [
    '03-01-2020',
    '03-28-2020',
    '04-11-2020',
    '04-25-2020',
    '05-09-2020',
    '05-23-2020',
    '06-06-2020',
    '06-20-2020',
    '07-04-2020',
    '07-18-2020',
    '08-08-2020',
    '08-22-2020',
    '09-12-2020',
    '09-26-2020',
    '10-10-2020',
    '10-24-2020',
    '11-07-2020',
    '11-21-2020',
    '12-05-2020',
    '12-19-2020',
    '01-02-2021',
    '01-16-2021',
    '01-30-2021',
    '02-13-2021',
    '02-27-2021',
    '03-13-2021',
    '03-27-2021',
    '04-10-2021',
    '04-24-2021',
    '05-08-2021',
    '05-22-2021',
    '06-05-2021',
    '06-19-2021',
    '07-03-2021'
  ];


  function InitChart() {
    // dimensions
    var outerWidth = 1140;
    var outerHeight = 500;
    var margin = {top: 20, right: 80, bottom: 80, left: 40};
    var width = outerWidth - margin.left - margin.right;
    var height = outerHeight - margin.top - margin.bottom;
    var viewBox = "0 0 " + outerWidth + " " + outerHeight;

    var dataExtent = d3.extent(upstreamData, function(d) { return d.day; });
    console.log(dataExtent);

    xScale = d3.scale.linear()
          .domain(d3.extent(upstreamData, function(d) { return d.day; }))
          .range([0, width]);

    yScale = d3.scale.linear()
          .domain([0,60])
          .range([height, 0]);


    xAxis = d3.svg.axis()
              .scale(xScale)
              .tickValues(dataLabels)
              .orient("bottom");

    yAxis = d3.svg.axis()
              .scale(yScale)
              .innerTickSize(-width)
              .outerTickSize(0)
              .tickFormat(function(d,i){
                return d + "%";
              })
              .orient("left");

    svg = d3.select(".chart").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", viewBox)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("dy", "12")
        .attr("dx", "-7")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(yAxis);

    var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d.day);
        })
        .y(function(d) {
            return yScale(d.growth);
        });

    svg.append('path')
        .attr('d', lineGen(upstreamData))
        .attr('stroke', '#8c489a')
        .attr('stroke-width', 2)
        .attr("transform", "translate(" + margin.left + ",0)")
        .attr('fill', 'none');

    svg.append('path')
        .attr('d', lineGen(downstreamData))
        .attr('stroke', '#e12053')
        .attr('stroke-width', 2)
        .attr("transform", "translate(" + margin.left + ",0)")
        .attr('fill', 'none');

    }
    InitChart();

});
