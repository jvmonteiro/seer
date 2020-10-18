export class Base {
  constructor(config) {
    this.config = config;
    this.data = config.data;
    this.svg = null;
    this.margins = null;

    this.xScale = null;
    this.yScale = null;

    this.createSvg();
    this.createMargins();
    this.createLabels();
    this.createAxis();
  }

  createSvg() {
    this.svg = d3
      .select(this.config.div)
      .append('svg')
      .attr('x', this.config.x)
      .attr('y', this.config.y)
      .attr('width', this.config.width + this.config.left * 1.6 + this.config.right + 30)
      .attr('height', this.config.height + this.config.top + this.config.bottom * 1.6);
  }
  createMargins() {
    this.margins = this.svg
      .append('g')
      .attr('transform', `translate(${this.config.left * 1.5 + 30},${this.config.top})`);
  }

  createAxis() {
    this.margins.append('g').attr('class', 'axis-x');
    this.margins.append('g').attr('class', 'axis-y');
  }

  createLabels() {
    const labelX = this.config.labelX ? this.config.labelX : '';
    const labelY = this.config.labelY ? this.config.labelY : '';
    this.svg
      .append('text')
      .attr('class', 'label-x')
      .attr(
        'transform',
        `translate(${(this.config.width + this.config.left * 1.6 + this.config.right + 30) / 2},${
          this.config.height + this.config.top + this.config.bottom
        })`,
      )
      .attr('dy', '0.5em')
      .style('text-anchor', 'middle')
      .text(labelX);

    this.svg
      .append('text')
      .attr('class', 'label-y')
      .attr('transform', 'rotate(-90)')
      .attr('dy', '0.5em')
      .attr('y', this.config.left - 22)
      .attr('x', 0 - (this.config.height + this.config.top + this.config.bottom) / 2)
      .style('text-anchor', 'middle')
      .text(labelY);
  }
}
