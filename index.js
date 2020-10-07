import { Scatterplot } from './charts/scatterplot.chart.js';

export async function scatter() {
  let c = {
    div: '#main',
    x: 200,
    y: 100,
    width: 200,
    height: 200,
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
  };

  let plot = new Scatterplot(c);
  let data = await plot.loadCSV('./data/superstore.csv');

  data = data.slice(0, 100);
  const circles = plot.format(data, ['Sales', 'Profit', 4]);

  plot.createScales();
  plot.render();

  let c2 = {
    div: '#plot2',
    x: 10,
    y: 10,
    width: 300,
    height: 200,
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
  };
  let plot2 = new Scatterplot(c2);
  let data2 = await plot2.loadJSON('./data/superstore.json');
  data2 = data2.slice(200, 300);

  const circles2 = plot2.format(data2, ['Sales', 'Profit', 8]);
  plot2.createScales();
  plot2.render();
}

scatter();
