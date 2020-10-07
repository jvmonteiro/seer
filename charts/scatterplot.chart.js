import { Base } from './base.chart.js';

export class Scatterplot extends Base {
  constructor(config) {
    super(config);
    this.circles = [];
  }

  format(data, dimensions) {
    const circles = data.map((d) => {
      return {
        cx: +d[dimensions[0]],
        cy: +d[dimensions[1]],
        r: +dimensions[2],
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

  render() {
    this.margins
      .selectAll('circle')
      .data(this.circles)
      .join('circle')
      .attr('cx', (d) => this.xScale(d.cx))
      .attr('cy', (d) => this.yScale(d.cy))
      .attr('r', (d) => d.r);
  }
}
