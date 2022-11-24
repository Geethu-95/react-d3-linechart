import React, { useEffect,useState } from "react";
import * as d3 from "d3";

export default function Graph(props) {

  const [data,setData] = useState([]);
setData(props.data);

// for (const data of Object.keys(props.data)) {
//    data = props.data[data];
  
// }

         // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // add X axis and Y axis
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(d3.extent(data, (d) => { return d.month; }));
    y.domain([0, d3.max(data, (d) => { return d.acv; })]);
  
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
      
    // add the Line
    var valueLine = d3.line()
    .x((d) => { return x(d.month); })
    .y((d) => { return y(d.acv); });
  
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);
      return(
        <></>
    )
}