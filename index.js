import { Scatterplot } from './charts/scatterplot.chart.js';
import { BarChart } from './charts/bar.chart.js';
import { LineChart } from './charts/line.chart.js';

export async function scatter() {
  let data = await d3.csv('./data/superstore.csv');
  let data2 = await d3.json('./data/superstore.json');
  let c = {
    div: '#plot1',
    data: data.slice(Math.floor(Math.random() * 100), 200 + Math.floor(Math.random() * 200)),
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
  plot.format({ cx: 'Sales', cy: 'Profit', col: 'Discount', r: 4 });
  plot.render();
  let c2 = {
    div: '#plot2',
    data: data2.slice(50 + Math.floor(Math.random() * 250), 400 + Math.floor(Math.random() * 100)),
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
  plot2.format({ cx: 'Sales', cy: 'Profit', col: 'Discount', r: 6 });
  plot2.render();

  const updatePlot1 = () => {
    // Plot 1
    low = Math.floor(Math.random() * 100);
    high = 200 + Math.floor(Math.random() * 200);

    plot.data = data.slice(low, high);
    plot.format({ cx: 'Sales', cy: 'Profit', col: 'Discount', r: 4 });
    plot.render();
  };

  const updatePlot2 = () => {
    // Plot 2
    low2 = 50 + Math.floor(Math.random() * 250);
    high2 = 400 + Math.floor(Math.random() * 100);

    plot2.data = data2.slice(low2, high2);
    plot2.format({ cx: 'Sales', cy: 'Profit', col: 'Discount', r: 6 });
    plot2.render();
  };

  let low, high, low2, high2, data1, data3;
  const plot1Activator = document.querySelector('#plot1');
  const plot2Activator = document.querySelector('#plot2');
  plot1Activator.addEventListener('click', updatePlot1);
  plot2Activator.addEventListener('click', updatePlot2);
}

export async function bar() {
  let data = await d3.csv('./data/superstore.csv');
  let data2 = await d3.json('./data/superstore.json');

  let c = {
    div: '#plot3',
    data: data.slice(Math.floor(Math.random() * 100), 200 + Math.floor(Math.random() * 200)),
    x: 10,
    y: 10,
    width: 200,
    height: 200,
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
    labelX: 'Segment',
    labelY: 'Sales',
  };

  let plot = new BarChart(c);
  plot.format({ x: 'Segment', y: 'Sales' });
  plot.render();
  let c2 = {
    div: '#plot4',
    data: data2.slice(50 + Math.floor(Math.random() * 250), 400 + Math.floor(Math.random() * 100)),
    x: 10,
    y: 10,
    width: 200,
    height: 200,
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
    labelX: 'Segment',
    labelY: 'Sales',
  };

  let plot2 = new BarChart(c2);
  plot2.format({ x: 'Segment', y: 'Sales' });
  plot2.render();
  const updatePlot1 = () => {
    // Plot 1
    low = Math.floor(Math.random() * 100);
    high = 200 + Math.floor(Math.random() * 200);

    plot.data = data.slice(low, high);
    plot.format({ x: 'Segment', y: 'Sales' });
    plot.render();
  };

  const updatePlot2 = () => {
    // Plot 2
    low2 = 50 + Math.floor(Math.random() * 250);
    high2 = 400 + Math.floor(Math.random() * 100);

    plot2.data = data2.slice(low2, high2);
    plot2.format({ x: 'Segment', y: 'Sales' });
    plot2.render();
  };
  let low, high, low2, high2, data1, data3;
  const plot1Activator = document.querySelector('#plot3');
  const plot2Activator = document.querySelector('#plot4');
  plot1Activator.addEventListener('click', updatePlot1);
  plot2Activator.addEventListener('click', updatePlot2);
}

export async function line() {
  let data = await d3.csv('./data/superstore.csv');
  let c = {
    div: '#plot5',
    data: data.slice(Math.floor(Math.random() * 10), 11 + Math.floor(Math.random() * 80)),
    x: 10,
    y: 10,
    width: 400,
    height: 200,
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
    labelX: 'Order Date',
    labelY: 'Sales',
  };

  let plot = new LineChart(c);

  const updatePlot1 = () => {
    // Plot 1
    low = Math.floor(Math.random() * 10);
    high = 11 + Math.floor(Math.random() * 80);

    plot.data = data.slice(low, high);
    plot.format({ x: 'Order Date', y: 'Sales', parseDate: '%d/%m/%Y' });
    plot.render();
  };

  let low, high;
  const plot1Activator = document.querySelector('#plot5');
  plot1Activator.addEventListener('click', updatePlot1);
}

scatter();
bar();
line();
