
function getData() {
  var linkurl="https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
  req=new XMLHttpRequest();
  req.open("GET",linkurl,true);
  req.send();
  req.onload=function(){
    json=JSON.parse(req.responseText);
//    var data = json;
    graphChoroplethMap(json);
   };
}


const graphChoroplethMap = function(education) {

//  console.log("----->"+JSON.stringify(education, null, 4));
  var short_edu=[];
  var percents=[];
  var edu=[];
  education.forEach(county => {
    short_edu[county.fips]=county.area_name+', '+county.state+': '+county.bachelorsOrHigher+'%';
    percents.push(county.bachelorsOrHigher);
    edu[county.fips]=county.bachelorsOrHigher;
  });

  var minPercent=d3.min(percents);
  var maxPercent=d3.max(percents);

  var width = 960,
      height = 600;

  var tooltip = d3.select(".tooltip")
        .attr('id', 'tooltip')
        .style("opacity", 0);

  var colorCodes=['#FFE4C4', '#F5DEB3', '#D2B48C', '#F4A460', '#CD853F', '#8B4513', '#A52A2A', '#800000']
  const myColor = d3.scaleQuantile()
                    .domain([minPercent, maxPercent])
                    .range(colorCodes);

  var colorQuantiles = myColor.quantiles();
  colorQuantiles.unshift(0);

  var fill = d3.scaleLog()
      .domain([10, 500])
      .range(["lightgreen", "darkgreen"]);
  //    .range(["brown", "steelblue"]);

  var path = d3.geoPath();

  var svg = d3.select('#graph')
      .append("svg")
      .attr("width", width)
      .attr("height", height);


  var source="https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

  d3.queue().
  defer(d3.json, source).
  await(domap);

//  d3.json(source, domap);

  function domap(error, us) {

        // draw the counties
      svg.append("g")
          .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.counties).features)
          .enter()

          .append("path")
          .attr("class","county")
          .attr("d", path)
          .attr("data-fips", function(d){
            return d.id})
          .attr("data-education", function(d){
            return edu[d.id]})
          .style("fill", function(d) {
              return myColor( edu[d.id] );
          })
          .on('mouseover', function(d, i) {
              d3.select(this)
              .style("fill", "green");
              tooltip.transition()
              .duration(10)
              .style("opacity", .9);
              tooltip.html(short_edu[d.id])
              .attr("data-education", edu[d.id])
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");

          })
          .on('mousemove', function(d, i) {
              tooltip.html(short_edu[d.id])
              .attr("data-education", edu[d.id])
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");

          })
          .on('mouseout', function(d, i) {
            d3.select(this)
            .style("fill", function(d) {
                tooltip.transition()
                .duration(100)
                .style("opacity", 0);
                var tmp=education.filter(function(county){
                    return (county.fips === d.id);
                })[0].bachelorsOrHigher;
                return myColor( tmp );
            });
          });

          // draw the states
      svg.append("path")
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a.id !== b.id; }))
          .attr("class", "states")
          .attr("d", path);

          // color key code legend
       const legend = svg.selectAll(".legend")
                   .data(colorQuantiles)
                   .enter()
                   .append("g")
                   .attr('id','legend')
                   .attr("class", "legend")
                   .attr("font-size", "12px")
                   .attr("font-style", "Roboto")
                   .attr("transform", function (d, i) {
                     return "translate(" + i*30 + ",0)";
                    });

             // draw color codes
      legend.append("rect")
            .attr("x", (d, i) => width/2+i+130)
            .attr("y", 35)
            .attr("width", 30)
            .attr("height", 25)
            .style("fill", function (d, i) {
                return colorCodes[i];
             });

             // draw ticks
      legend.append("rect")
            .attr("x", (d, i) => {
               return (i==0)?(width/2+i+130):(width/2+i-1+130);
             })
            .attr("y", 60)
            .attr("width", 1)
            .attr("height", 5);

            // write color value range
      legend.append("text")
            .attr("x", (d, i) => width/2+(i+1)+130)
            .attr("y", 78)
            .text(function (d, i) {
               return colorQuantiles[i].toFixed(1);
            })
            .style("text-anchor", "middle");

    }
}

getData();
