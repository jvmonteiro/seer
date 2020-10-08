import { Scatterplot } from './charts/scatterplot.chart.js';

export async function scatter() {
  const updatePlot1 = () => {
    // Plot 1
    low = Math.floor(Math.random() * 100);
    high = 200 + Math.floor(Math.random() * 200);

    data1 = data.slice(low, high);
    plot.format(data1, { cx: 'Sales', cy: 'Profit', r: 4 });
    plot.createScales();
    plot.updateAxis();
    plot.render();
  };

  const updatePlot2 = () => {
    // Plot 2
    low2 = 50 + Math.floor(Math.random() * 250);
    high2 = 400 + Math.floor(Math.random() * 100);

    data3 = data2.slice(low2, high2);
    plot2.format(data3, { cx: 'Sales', cy: 'Profit', r: 6 });
    plot2.createScales();
    plot2.updateAxis();
    plot2.render();
  };

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

  let low, high, low2, high2, data1, data3;
  const plot1Activator = document.querySelector('#plot1');
  const plot2Activator = document.querySelector('#plot2');
  plot1Activator.addEventListener('click', updatePlot1);
  plot2Activator.addEventListener('click', updatePlot2);

  updatePlot1();
  updatePlot2();
}

scatter();
