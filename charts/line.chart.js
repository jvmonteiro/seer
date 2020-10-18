import { Base } from './base.chart.js';

export class LineChart extends Base {
  constructor(config) {
    super(config);
    this.line = [];

    this.xRange = null;
    this.yRange = null;
    this.margins.append('path').attr('class', 'line-chart');
  }

  format(dimensions) {
    const line = this.data.map((d) => {
      return {
        x: dimensions.parseDate
          ? d3.timeParse(dimensions.parseDate)(d[dimensions.x])
          : +d[dimensions.x],
        y: +d[dimensions.y],
      };
    });
    this.line = line;
    dimensions.parseDate ? this.createScalesTime() : this.createScalesNumber();
    return line;
  }

  createScalesTime() {
    let xExtent = d3.extent(this.line, (d) => d.x);

    let yExtent = d3.max(this.line, (d) => d.y);

    this.xScale = d3.scaleTime().domain(xExtent).range([0, this.config.width]);
    this.yScale = d3.scaleLinear().domain([0, yExtent]).nice().range([this.config.height, 0]);
  }
  createScalesNumber() {
    let xExtent = d3.extent(this.line, (d) => d.x);

    let yExtent = d3.max(this.line, (d) => d.y);

    this.xScale = d3.scaleLinear().domain([0, xExtent]).nice().range([0, this.config.width]);
    this.yScale = d3.scaleLinear().domain([0, yExtent]).nice().range([this.config.height, 0]);
  }
  updateAxis() {
    let xAxis = d3.axisBottom(this.xScale).ticks(5);

    let yAxis = d3.axisLeft(this.yScale);

    this.margins
      .selectAll('.axis-x')
      .attr('transform', `translate(0,${this.config.height})`)
      .call(xAxis);

    this.margins.selectAll('.axis-y').call(yAxis);
  }

  render() {
    this.updateAxis();
    const line = this.margins.selectAll('.line-chart');

    line
      .datum(this.line)
      .enter()
      .call((en) =>
        en
          .transition()
          .duration(600)
          .attr(
            'd',
            d3
              .line()
              .x((d) => this.xScale(d.x))
              .y((d) => this.yScale(d.y)),
          ),
      )
      .attr('fill', 'blue')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2.5);

    line.call((up) =>
      up
        .transition()
        .duration(600)
        .attr(
          'd',
          d3
            .line()
            .x((d) => this.xScale(d.x))
            .y((d) => this.yScale(d.y)),
        )
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2.5),
    );

    line.exit().call((ex) => ex.remove());
  }
}
