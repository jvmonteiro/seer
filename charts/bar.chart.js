import { Base } from './base.chart.js';

export class BarChart extends Base {
  constructor(config) {
    super(config);
    this.rects = [];
    this.bins = [];

    this.xRange = null;
    this.yRange = null;
  }

  format(data, dimensions) {
    let counter = {};
    let rects = [];
    const parsed = data.map((d) => {
      if (counter[d[dimensions.x]]) {
        counter[d[dimensions.x]] += 1;
      } else {
        counter[d[dimensions.x]] = 1;
      }
    });

    for (let key in counter) {
      rects.push({ x: key, y: counter[key] });
    }
    this.xRange = Object.keys(counter);
    this.yRange = Object.values(counter);
    this.rects = rects;
    this.createScales();
    return rects;
  }

  createScales() {
    this.xScale = d3.scaleBand().range([0, this.config.width]).padding(0.3).domain(this.xRange);
    this.yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.yRange)])
      .nice()
      .range([this.config.height, 0]);
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
    this.updateAxis();
    const rects = this.margins.selectAll('rect').data(this.rects);

    rects
      .join('rect')
      .attr('x', (d) => this.xScale(d.x))
      .attr('y', (d) => this.yScale(d.y))
      .attr('width', this.xScale.bandwidth())
      .attr('height', (d) => this.config.height - this.yScale(d.y))
      .style('fill', 'RoyalBlue');
    // .style('fill', (d) => this.colScale(d.col))
    // rects
    //   .exit()
    //   .style('fill', (d) => this.colScale(d.col))
    //   .call((ex) => ex.transition().duration(500).style('opacity', 0).remove());

    // rects
    //   .attr('r', (d) => d.r)
    //   .style('fill', (d) => this.colScale(d.col))
    //   .call((up) =>
    //     up
    //       .transition()
    //       .duration(600)
    //       // .delay((d, i) => i * 3)
    //       .attr('cx', (d) => this.xScale(d.cx))
    //       .attr('cy', (d) => this.yScale(d.cy)),
    //   );
  }
}
