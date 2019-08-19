import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Dot from 'components/Dots';
import AxisX from 'components/AxisX';
import AxisY from 'components/AxisY';
import Line from 'components/Line';
import { CHART_MARGINS } from 'components/constants';

class LinerChart extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    const { svgHeight, svgWidth, data, lineOptions, dotsOptions } = this.props;

    const width = svgWidth - CHART_MARGINS.left - CHART_MARGINS.right;
    const height = svgHeight - CHART_MARGINS.top - CHART_MARGINS.bottom;

    const xScale = d3.scaleLinear().range([0, width]);

    const yScale = d3.scaleLinear().range([height, 0]);

    xScale.domain([0, d3.max(data, d => d[0])]);
    yScale.domain([0, d3.max(data, d => d[1])]);

    const axisXProps = {
      height,
      scale: xScale,
    };
    const axisYProps = { scale: yScale };

    const commonProps = {
      xScale,
      yScale,
      data,
    };

    const lineProps = {
      ...commonProps,
      lineOptions,
    };

    const dotProps = {
      ...commonProps,
      dotsOptions,
    };

    return (
      <>
        {data.length && (
          <svg height={svgHeight} width={svgWidth} ref={this.ref}>
            <g
              transform={`translate(${CHART_MARGINS.left},${CHART_MARGINS.top})`}
            >
              <AxisX {...axisXProps} />
              <AxisY {...axisYProps} />
              <Line {...lineProps} />
              <Dot {...dotProps} />
            </g>
          </svg>
        )}
      </>
    );
  }
}

LinerChart.propTypes = {
  svgHeight: PropTypes.number,
  svgWidth: PropTypes.number,
  data: PropTypes.array,
  lineOptions: PropTypes.object,
  dotsOptions: PropTypes.object,
};

export default LinerChart;
