import { Base } from './base.chart.js';

export class Scatterplot extends Base {
  constructor(config) {
    super(config);
    this.circles = [];
  }

  format(data, dimensions) {
    const circles = data.map((d) => {
      return {
        cx: +d[dimensions.cx],
        cy: +d[dimensions.cy],
        r: dimensions.r,
      };
    });
    this.circles = circles;
    return circles;
  }

  createScales() {
    let xExtent = d3.extent(this.circles, (d) => {
      return d.cx;
    });
    let yExtent = d3.extent(this.circles, (d) => {
      return d.cy;
    });

    this.xScale = d3.scaleLinear().domain(xExtent).nice().range([0, this.config.width]);
    this.yScale = d3.scaleLinear().domain(yExtent).nice().range([this.config.height, 0]);
  }

  updateAxis() {
    let xAxis = d3.axisBottom(this.xScale).ticks(5);

    let yAxis = d3.axisLeft(this.yScale).ticks(5);

    this.margins
      .selectAll('.axis-x')
      .attr('transform', `translate(0,${this.config.height})`)
      .call(xAxis);

    this.margins.selectAll('.axis-y').call(yAxis);
  }

  render() {
    const circles = this.margins.selectAll('circle').data(this.circles);

    circles
      .enter()
      .append('circle')
      .attr('r', (d) => d.r)
      .attr('cy', (d) => this.yScale(d.cy))
      .style('opacity', 0)
      .style('fill', 'RoyalBlue')
      .call((en) =>
        en
          .transition()
          .duration(600)
          .attr('cx', (d) => this.xScale(d.cx))
          .style('opacity', 1),
      );

    circles
      .exit()
      .style('fill', 'IndianRed')
      .call((ex) => ex.transition().duration(500).style('opacity', 0).remove());

    circles
      .attr('r', (d) => d.r)
      .style('fill', 'SeaGreen')
      .call((up) =>
        up
          .transition()
          .duration(600)
          // .delay((d, i) => i * 3)
          .attr('cx', (d) => this.xScale(d.cx))
          .attr('cy', (d) => this.yScale(d.cy)),
      );
  }
}
