jQuery(function($){

  var upstreamData = [
    {"date": '03-01-2020', "growth": 0},
    {"date": '03-28-2020', "growth": 27.7},
    {"date": '04-11-2020', "growth": 34},
    {"date": '04-25-2020', "growth": 34.3},
    {"date": '05-09-2020', "growth": 31.1},
    {"date": '05-23-2020', "growth": 30},
    {"date": '06-06-2020', "growth": 25.1},
    {"date": '06-20-2020', "growth": 23.6},
    {"date": '07-04-2020', "growth": 22.1},
    {"date": '07-18-2020', "growth": 23.6},
    {"date": '08-08-2020', "growth": 25.6},
    {"date": '08-22-2020', "growth": 27.1},
    {"date": '09-12-2020', "growth": 31.5},
    {"date": '09-26-2020', "growth": 37.1},
    {"date": '10-10-2020', "growth": 37.3},
    {"date": '10-24-2020', "growth": 39.1},
    {"date": '11-07-2020', "growth": 42.9},
    {"date": '11-21-2020', "growth": 49.1},
    {"date": '12-05-2020', "growth": 53.5},
    {"date": '12-19-2020', "growth": 55.8},
    {"date": '01-02-2021', "growth": 44.7},
    {"date": '01-16-2021', "growth": 56.2},
    {"date": '01-30-2021', "growth": 57.2},
    {"date": '02-13-2021', "growth": 57.9},
    {"date": '02-27-2021', "growth": 54.8},
    {"date": '03-13-2021', "growth": 53.4},
    {"date": '03-27-2021', "growth": 51.7},
    {"date": '04-10-2021', "growth": 49.4},
    {"date": '04-24-2021', "growth": 51.7},
    {"date": '05-08-2021', "growth": 51.1},
    {"date": '05-22-2021', "growth": 49.8},
    {"date": '06-05-2021', "growth": 49.5},
    {"date": '06-19-2021', "growth": 49},
    {"date": '07-03-2021', "growth": 47.7}
  ];

  var downstreamData = [
    {"date": '03-01-2020', "growth": 0},
    {"date": '03-28-2020', "growth": 20.1},
    {"date": '04-11-2020', "growth": 20},
    {"date": '04-25-2020', "growth": 16.2},
    {"date": '05-09-2020', "growth": 12.2},
    {"date": '05-23-2020', "growth": 16.1},
    {"date": '06-06-2020', "growth": 6.6},
    {"date": '06-20-2020', "growth": 9.7},
    {"date": '07-04-2020', "growth": 14.3},
    {"date": '07-18-2020', "growth": 9.4},
    {"date": '08-08-2020', "growth": 17.4},
    {"date": '08-22-2020', "growth": 14.3},
    {"date": '09-12-2020', "growth": 13.7},
    {"date": '09-26-2020', "growth": 14.2},
    {"date": '10-10-2020', "growth": 15.1},
    {"date": '10-24-2020', "growth": 16.3},
    {"date": '11-07-2020', "growth": 26.1},
    {"date": '11-21-2020', "growth": 27.4},
    {"date": '12-05-2020', "growth": 30},
    {"date": '12-19-2020', "growth": 32.6},
    {"date": '01-02-2021', "growth": 34.7},
    {"date": '01-16-2021', "growth": 31.8},
    {"date": '01-30-2021', "growth": 28.6},
    {"date": '02-13-2021', "growth": 29.8},
    {"date": '02-27-2021', "growth": 30.8},
    {"date": '03-13-2021', "growth": 25.7},
    {"date": '03-27-2021', "growth": 25.5},
    {"date": '04-10-2021', "growth": 28.5},
    {"date": '04-24-2021', "growth": 31.9},
    {"date": '05-08-2021', "growth": 28.9},
    {"date": '05-22-2021', "growth": 24.5},
    {"date": '06-05-2021', "growth": 24.6},
    {"date": '06-19-2021', "growth": 26.6},
    {"date": '07-03-2021', "growth": 25.1}
  ];


  function InitChart() {
    // dimensions
    var outerWidth = 1140;
    var outerHeight = 500;
    var margin = {top: 20, right: 80, bottom: 80, left: 40};
    var width = outerWidth - margin.left - margin.right;
    var height = outerHeight - margin.top - margin.bottom;
    var viewBox = "0 0 " + outerWidth + " " + outerHeight;

    //parseDate = d3.time.format("%m-%d-%Y").parse;

    var dates = upstreamData.map(function(d) {
      return d.date;
    });

    /*
    upstreamData.forEach(function(d) {
      d.date = parseDate(d.date);
    });

    downstreamData.forEach(function(d) {
      d.date = parseDate(d.date);
    });
    */

    /*
    xScale = d3.time.scale()
          .domain(d3.extent(dates))
          .range([0, width]);

    */

    xScale = d3.scale.ordinal()
          .domain(upstreamData.map(function(d) {
            return d.date;
          }))
          .rangeBands([0, width], 0, 0);

    yScale = d3.scale.linear()
          .domain([0,60])
          .range([height, 0]);

    /*
    var dateFormatNormal = d3.time.format("%m-%d");
    var dateFormatYear = d3.time.format("%m-%d-%Y");
    */

    console.log(dates);


    xAxis = d3.svg.axis()
              /*
              .tickFormat(function(d, i) {
                if (i == 0 || i == 20) {
                  return dateFormatYear(d);
                }
                else {
                  return dateFormatNormal(d);
                }
              })
              */
              .tickValues(dates)
              .scale(xScale);

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
            return xScale(d.date);
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
