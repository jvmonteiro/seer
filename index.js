import { Scatterplot } from './charts/scatterplot.chart.js';

export async function scatter() {
  let c = {
    div: '#plot1',
    x: 10,
    y: 10,
    width: 200,
    height: 200,
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
  };

  let plot = new Scatterplot(c);
  let data = await plot.loadCSV('./data/superstore.csv');

  let c2 = {
    div: '#plot2',
    x: 10,
    y: 10,
    width: 200,
    height: 200,
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
  };

  let plot2 = new Scatterplot(c2);
  let data2 = await plot.loadJSON('./data/superstore.json');

  setInterval(() => {
    let low, high;
    low = Math.floor(Math.random() * 100);
    high = 200 + Math.floor(Math.random() * 200);

    let data1 = data.slice(low, high);
    const circles1 = plot.format(data1, { cx: 'Sales', cy: 'Profit', r: 4 });
    plot.createScales();
    plot.render();
    console.log('updated plot 1', low, high);
  }, 1300);

  setInterval(() => {
    let low, high;
    low = 200 + Math.floor(Math.random() * 150);
    high = 400 + Math.floor(Math.random() * 100);

    let data3 = data2.slice(low, high);
    const circles1 = plot2.format(data3, { cx: 'Sales', cy: 'Profit', r: 6 });
    plot2.createScales();
    plot2.render();
    console.log('updated plot 2', low, high);
  }, 2300);
}

scatter();
