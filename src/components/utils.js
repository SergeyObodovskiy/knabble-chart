import * as d3 from 'd3';
export const d3line = (xScale, xValueKey, yScale, yValueKey) =>
  d3
    .line()
    .x(function(d) {
      return xScale(d[xValueKey]);
    }) // set the x values for the line generator
    .y(function(d) {
      return yScale(d[yValueKey]);
    }) // set the y values for the line generator
    .curve(d3.curveMonotoneX); // apply smoothing to the line

export const generateData = n =>
  d3.range(n).map((d, i) => [i, d3.randomUniform(1)()]);
