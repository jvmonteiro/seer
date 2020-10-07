export class Base {
  constructor(config) {
    this.config = config;

    this.svg = null;
    this.margins = null;

    this.xScale = null;
    this.yScale = null;

    this.createSvg();
    this.createMargins();
  }

  createSvg() {
    this.svg = d3
      .select(this.config.div)
      .append('svg')
      .attr('x', this.config.x)
      .attr('y', this.config.y)
      .attr('width', this.config.width + this.config.left + this.config.right)
      .attr('height', this.config.height + this.config.top + this.config.bottom);
  }

  async loadCSV(file) {
    return await d3.csv(file);
  }

  async loadJSON(file) {
    return await d3.json(file);
  }

  createMargins() {
    this.margins = this.svg
      .append('g')
      .attr('transform', `translate(${this.config.left},${this.config.top})`);
  }
}
