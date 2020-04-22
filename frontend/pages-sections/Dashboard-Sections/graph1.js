import React, {useRef, useEffect} from "react";
import {Typography} from '@material-ui/core';

import * as d3 from 'd3'

export default function graph1(props) {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      drawGraph(props.data);
    }
  },[props.data, d3Container.current]);

  const drawGraph = (data) => {
    const margin = 60;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;
    const scale = 20

    const svg = d3.select(d3Container.current);
    svg.attr('height',600);
    svg.attr('width',1000);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 50]);

    chart.append('g')
      .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(data.map((s) => s.language))
      .padding(0.2)
  
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    //kasih garis tengah
    // chart.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom()
    //     .scale(xScale)
    //     .tickSize(-height, 0, 0)
    //     .tickFormat(''))
  
    chart.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft()
        .scale(yScale)
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )
    //end garis tengah

    //load data
    const barGroups = chart.selectAll()
      .data(data)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (s) => xScale(s.language))
      .attr('y', (s) => yScale(s.value))
      .attr('height', (s) => height - yScale(s.value))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 0.6)
        .attr('x', (a) => xScale(a.language) - 5)
        .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual.value)
        chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)
      })
      .on('mouseleave', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.language))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })

    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.value}%`)

    //tambah label
    svg.append('text')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Love meter (%)')
  
     svg.append('text')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Most loved programming languages in 2020')
  }
  
  return (
    <div>
      <Typography variant="h6">
        Example D3.js
      </Typography>
      
      <svg
        className="d3-component"
        ref={d3Container}
      />
    </div>
  );
}
