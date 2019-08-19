import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { d3line } from 'components/utils';
import { CHART_MARGINS } from 'components/constants';
import './index.scss';

class LinerChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.drawChart();
  }
  componentDidUpdate() {
    this.clearChart();
    this.drawChart();
  }

  drawChart() {
    const { svgHeight, svgWidth, data, lineOptions, dotsOptions } = this.props;
    const { className: lineClassName } = lineOptions;
    const { className: dotsClassName, radius } = dotsOptions;

    const width = svgWidth - CHART_MARGINS.left - CHART_MARGINS.right;
    const height = svgHeight - CHART_MARGINS.top - CHART_MARGINS.bottom;

    const xScale = d3.scaleLinear().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);

    const dotRadius = radius;

    xScale.domain([0, d3.max(data, d => d[0])]);
    yScale.domain([0, d3.max(data, d => d[1])]);

    const svg = d3.select(this.ref);
    const line = d3line(xScale, [0], yScale, [1]);

    // Draw container for inner chart content
    const svgContent = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + CHART_MARGINS.left + ',' + CHART_MARGINS.top + ')',
      );

    // Draw xAxis
    const xAxis = svgContent
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      // .transition()
      .call(d3.axisBottom(xScale));

    // Draw yAxis
    svgContent
      .append('g')
      .attr('class', 'axis axis--y')
      // .transition()
      .call(d3.axisLeft(yScale));

    // Create clip for limit drawing ares
    svgContent
      .append('defs')
      .append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', 0)
      .attr('y', 0);

    const chartContent = svgContent.append('g').attr('clip-path', 'url(#clip)');

    // Draw line
    chartContent
      .append('path')
      .datum(data)
      .attr('class', lineClassName)
      .attr('d', line);

    // Create drag behavior for zoom brush tool
    const drag = d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    function dragstarted() {
      d3.select(this)
        .raise()
        .classed('active', true);
    }

    function dragged(d) {
      const minY = dotRadius;
      const maxY = height;
      if (Math.sign(d3.event.y) !== -1 && d3.event.y < height) {
        d[1] = yScale.invert(d3.event.y);
      }

      d3.select(this).attr(
        'cy',
        (d.y = Math.max(minY, Math.min(maxY, d3.event.y))),
      );
      chartContent.select('path').attr('d', line);
    }

    function dragended(d) {
      d3.select(this).classed('active', false);
    }

    // Create zoom brush tool
    const brush = d3
      .brushX()
      .extent([[0, 0], [width, height]])
      .filter(() => d3.event.button === 2)
      .on('end', brushedEnded);

    // Add zoom brush tool
    chartContent
      .append('g')
      .attr('class', 'brush')
      .call(brush);

    // Add circles after brush for make it draggable
    const dots = chartContent
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', dotsClassName)
      .attr('r', dotRadius)
      .attr('cx', function(d) {
        return xScale(d[0]);
      })
      .attr('cy', function(d) {
        return yScale(d[1]);
      });

    // Draw dots in the and for drag interaction
    chartContent.selectAll('circle').call(drag);

    // Disable default right click events
    chartContent.on('contextmenu', () => {
      d3.event.preventDefault();
    });

    let idleTimeout;
    function idled() {
      idleTimeout = null;
    }

    // Function that update the chart for given boundaries
    function brushedEnded() {
      const extent = d3.event.selection;

      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if (!extent) {
        if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
        xScale.domain([0, d3.max(data, d => d[0])]);
      } else {
        xScale.domain([xScale.invert(extent[0]), xScale.invert(extent[1])]);
        // This remove the grey brush area as soon as the selection has been done
        chartContent.select('.brush').call(brush.move, null);
      }

      // Update axis, dot, line position
      xAxis.call(d3.axisBottom(xScale));

      chartContent
        .selectAll('circle')
        .transition()
        .attr('cx', function(d) {
          return xScale(d[0]);
        })
        .attr('cy', function(d) {
          return yScale(d[1]);
        });

      chartContent
        .selectAll('.line')
        .datum(data)
        .transition()
        .attr('class', lineClassName)
        .attr('d', line);
    }

    // Add custom select area event, because we can use only one brush tool for chart
    chartContent
      .on('mousedown', function() {
        dots.classed('selected', false);

        // Draw select tool
        const p = d3.mouse(this);

        chartContent
          .append('rect')
          .attr('class', 'dots-selection')
          .attr('x', p[0])
          .attr('y', p[1])
          .attr('width', 0)
          .attr('height', 0);
      })
      .on('mousemove', function() {
        const s = svg.select('rect.dots-selection');

        // Update select tool rect
        if (!s.empty()) {
          const p = d3.mouse(this);

          let d = {
            x: parseInt(s.attr('x'), 10),
            y: parseInt(s.attr('y'), 10),
            width: parseInt(s.attr('width'), 10),
            height: parseInt(s.attr('height'), 10),
          };
          const move = {
            x: p[0] - d.x,
            y: p[1] - d.y,
          };
          if (move.x < 1 || move.x * 2 < d.width) {
            d.x = p[0];
            d.width -= move.x;
          } else {
            d.width = move.x;
          }

          if (move.y < 1 || move.y * 2 < d.height) {
            d.y = p[1];
            d.height -= move.y;
          } else {
            d.height = move.y;
          }

          s.attr('x', d.x)
            .attr('y', d.y)
            .attr('width', d.width)
            .attr('height', d.height);

          // Deselect all temporary selected objects
          d3.selectAll(`.${dotsClassName}.selected`).classed('selected', false);

          d3.selectAll(`.${dotsClassName}`).each(function(pointData) {
            // If the Dots in the selected area it will be highlight
            if (
              pointData &&
              !d3.select(this).classed('selected') &&
              xScale(pointData[0]) - dotRadius >= d.x &&
              xScale(pointData[0]) + dotRadius <= d.x + d.width &&
              yScale(pointData[1]) - dotRadius >= d.y &&
              yScale(pointData[1]) + dotRadius <= d.y + d.height
            ) {
              d3.select(this).classed('selected', true);
            }
          });
        }
      })
      .on('mouseup', function() {
        chartContent.selectAll('rect.dots-selection').remove();
        d3.selectAll(`.${dotsClassName}`).classed('selected', false);
      })
      .on('mouseout', function() {
        if (
          d3.event.relatedTarget &&
          d3.event.relatedTarget.tagName === 'html'
        ) {
          chartContent.selectAll('rect.dots-selection').remove();
          d3.selectAll(`.${dotsClassName}`).classed('selected', false);
        }
      });
  }

  clearChart() {
    d3.select('svg > *').remove();
  }

  render() {
    const { svgHeight, svgWidth } = this.props;

    return (
      <svg height={svgHeight} width={svgWidth} ref={ref => (this.ref = ref)} />
    );
  }
}

LinerChart.propTypes = {
  svgHeight: PropTypes.number,
  svgWidth: PropTypes.number,
  data: PropTypes.array,
  lineOptions: PropTypes.shape({ className: PropTypes.string }),
  dotsOptions: PropTypes.shape({
    className: PropTypes.string,
    radius: PropTypes.number,
  }),
};

export default LinerChart;
