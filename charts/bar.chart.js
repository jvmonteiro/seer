import { Base } from './base.chart.js';

export class BarChart extends Base {
  constructor(config) {
    super(config);
    this.rects = [];

    this.xRange = null;
    this.yRange = null;
  }

  format(data, dimensions) {
    let counter = {};
    let rects = [];
    const parsed = data.map((d) => {
      if (counter[d[dimensions.x]]) {
        // Category already exists, increase its value.
        counter[d[dimensions.x]] += +d[dimensions.y];
      } else {
        // New category was found, add it to the map.
        counter[d[dimensions.x]] = +d[dimensions.y];
      }
    });

    for (let key in counter) {
      rects.push({ x: key, y: counter[key] });
    }
    // Create data array in format [{x: <x label>, y: <sum of all y for each x>}]
    this.xRange = Object.keys(counter).sort();
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
    let xAxis = d3.axisBottom(this.xScale).ticks(this.xRange.length);

    let yAxis = d3.axisLeft(this.yScale).ticks(4);

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
      .enter()
      .append('rect')
      .attr('x', (d) => this.xScale(d.x))
      .attr('y', (d) => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', (d) => this.config.height - this.yScale(0))
      .style('fill', 'Green')
      .call((en) =>
        en
          .transition()
          .duration(600)
          .attr('y', (d) => this.yScale(d.y))
          .attr('height', (d) => this.config.height - this.yScale(d.y)),
      );

    rects.call((en) =>
      en
        .transition()
        .duration(600)
        .attr('y', (d) => this.yScale(d.y))
        .attr('height', (d) => this.config.height - this.yScale(d.y)),
    );

    rects.exit().call((ex) =>
      ex
        .transition()
        .duration(600)
        .attr('height', (d) => this.config.height - this.yScale(0))
        .remove(),
    );
  }
}
