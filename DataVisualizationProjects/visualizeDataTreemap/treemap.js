

var w = 900,
    h = 500;

 // var svg = d3.select("svg");

     // width = +svg.attr("width"),
     // height = +svg.attr("height");


d3.json("https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json")
  .then(function(data) {
    var tooltip = d3.select(".tooltip")
         .attr('id', 'tooltip')
         .style("opacity", 1);

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
        // color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
        format = d3.format(",d");
    var color = d3.scaleOrdinal(d3.schemeCategory10);


    var treemap = d3.treemap()
        .tile(d3.treemapResquarify)
        .size([w, h])
        .round(true)
        .paddingInner(1);

    var root = d3.hierarchy(data)
        .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
        .sum(sumBySize)
        .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap(root);
    var categories = root.leaves().map(function (nodes) {
       return nodes.data.category;
     });
    categories = categories.filter(function(cat, idx, self) {
      return self.indexOf(cat) === idx;
    })
     console.log(categories);

    var cell = svg.selectAll("g")
      .data(root.leaves())
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

    cell.append("rect")
        .attr("id", function(d) { return d.data.id; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("class", "tile")
        .attr("data-name", function(d) { return d.data.name; })
        .attr("data-category", function(d) { return d.data.category; })
        .attr("data-value", function(d) { return d.data.value; })
        .attr("fill", function(d) {
            return color(d.parent.data.name);
          })
        .on('mouseover', function(d, i) {
            // d3.select(this)
            // .style("fill", "green");
            tooltip.transition()
            .duration(10)
            .style("opacity", .9);
            // console.log('Found !', d.data.value);
            tooltip.html(
              "Name: "+d.data.name+"<BR>Category: "+d.data.category+"<BR>Value: "+d.data.value
              // d.data.value;
            )
            .attr("data-value", d.data.value)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          })
          .on('mousemove', function(d, i) {
              tooltip.html(
                "Name: "+d.data.name+"<BR>Category: "+d.data.category+"<BR>Value: "+d.data.value
                // d.data.value;
              )
              .attr("data-education", d.data.value)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");

          })
          .on('mouseout', function(d, i) {
            d3.select(this)
            tooltip.transition()
            .duration(100)
            .style("opacity", 0);
          })
        ;

    cell.append("text")
        .selectAll("tspan")
        .data(function (d) {return d.data.name.split(/(?=[A-Z][^A-Z])/g);})
        .enter().append("tspan")
        .attr("class", "tile")
        .attr("x", 2)
        .attr("y", function (d, i) {return 11 + i * 10;})
        .text(function (d) {return d;})
         ;


       // color key code legend
    const legend = svg.selectAll(".legend")
                .data(categories)
                .enter()
                .append("g")
                .attr('id','legend')
                .attr("class", "legend")
                .attr("font-size", "12px")
                .attr("font-style", "Roboto")
                .attr("transform", function (d, i) {
                  return "translate(" + i*30 + ",0)";
                 });

         legend.append("rect")
               .attr("x", (d, i) => i*30)
               .attr("y", 520)
               .attr("class", "legend-item")
               .attr("width", 30)
               .attr("height", 25)
               .attr("fill", function(d) {
                   console.log(d);
                   return color(d);
                 })
                 ;
          legend.append("text")
              .attr("x", (d, i) => i*30+10 + i)
              .attr("y", 560)
              .text(function (d, i) {
                 return d;
              })
              .style("text-anchor", "middle");
  });

     function sumBySize(d) {
       return d.value;
     }
