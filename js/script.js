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
    '03-28',
    '04-11',
    '04-25',
    '05-09',
    '05-23',
    '06-06',
    '06-20',
    '07-04',
    '07-18',
    '08-08',
    '08-22',
    '09-12',
    '09-26',
    '10-10',
    '10-24',
    '11-07',
    '11-21',
    '12-05',
    '12-19',
    '01-02-2021',
    '01-16',
    '01-30',
    '02-13',
    '02-27',
    '03-13',
    '03-27',
    '04-10',
    '04-24',
    '05-08',
    '05-22',
    '06-05',
    '06-19',
    '07-03'
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

    var xScale = d3.scale.linear()
          .domain(d3.extent(upstreamData, function(d) { return d.day; }))
          .range([0, width]);

    var yScale = d3.scale.linear()
          .domain([0,60])
          .range([height, 0]);

    var xAxis = d3.svg.axis()
              .scale(xScale)
              .tickValues(upstreamData.map(function(item){
                return item.day;
              }))
              .tickFormat(function(d,i) {
                return dataLabels[i];
              })
              .orient("bottom");

    var yAxis = d3.svg.axis()
              .scale(yScale)
              .innerTickSize(-width)
              .outerTickSize(0)
              .tickFormat(function(d,i){
                return d + "%";
              })
              .orient("left");

        // Define the div for the tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var svg = d3.select(".chart").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", viewBox)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("dy", "4")
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
            .attr("class","line")
            .attr('d', lineGen(upstreamData))
            .attr('stroke', '#8c489a')
            .attr('stroke-width', 2)
            .attr("transform", "translate(" + margin.left + ",0)")
            .attr('fill', 'none');

        svg.append('path')
            .attr("class","line")
            .attr('d', lineGen(downstreamData))
            .attr('stroke', '#e12053')
            .attr('stroke-width', 2)
            .attr("transform", "translate(" + margin.left + ",0)")
            .attr('fill', 'none');

        svg.selectAll(".dot-upstream")
          .data(upstreamData)  // This is the nested data call
          .enter()
            .append("circle")
            .attr("class", "dot-upstream")
            .attr("cx", function(d) { return xScale(d.day) + margin.left; })
            .attr("cy", function(d) { return yScale(d.growth); })
            .attr("r", 4)
            .on("mouseover", function(d, i) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html('<div class="tooltip-date">' + dataLabels[i] + '</div><div class="tooltip-growth">'  + d.growth + '%</div>')
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.selectAll(".dot-downstream")
          .data(downstreamData)  // This is the nested data call
          .enter()
            .append("circle")
            .attr("class", "dot-downstream")
            .attr("cx", function(d) { return xScale(d.day) + margin.left; })
            .attr("cy", function(d) { return yScale(d.growth); })
            .attr("r", 4)
            .on("mouseover", function(d, i) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html('<div class="tooltip-date">' + dataLabels[i] + '</div><div class="tooltip-growth">'  + d.growth + '%</div>')
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

         //Select All of the lines and process them one by one
         d3.selectAll(".line").each(function(d,i) {
           d3.select(this).style("opacity","1");

           // Get the length of each line in turn
           var totalLength = d3.select(".line").node().getTotalLength();

           d3.selectAll(".line")
             .attr("stroke-dasharray", totalLength + " " + totalLength)
               .attr("stroke-dashoffset", totalLength)
               .transition()
               .duration(2000)
               .ease("ease-in") //Try linear, quad, bounce... see other examples here - http://bl.ocks.org/hunzy/9929724
               .attr("stroke-dashoffset", 0)
               .style("stroke-width", 3);
         });

         // reveal text
         d3.selectAll(".dot-downstream, .dot-upstream")
           .transition()
           .delay(1000)
           .duration(3000)
           .style("opacity", 1);

    }
    InitChart();

});
