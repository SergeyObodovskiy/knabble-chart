import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3';
import { RenderLifeCycle } from 'hooks/renderLifeCycle';
import { d3line } from 'components/utils';

const Line = props => {
  const pathRef = useRef(null);
  const { xScale, yScale, data, className } = props;
  const line = d3line(xScale, [0], yScale, [1]);
  const draw = () =>
    pathRef.current &&
    select(pathRef.current)
      .datum(data)
      .attr('class', className)
      .attr('d', line);

  RenderLifeCycle({
    firstRender: () => draw(),
    updateRender: () => draw(),
  });

  return <path ref={pathRef} />;
};

Line.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.array),
  className: PropTypes.string,
};

Line.defaultProps = {
  className: 'line',
};

export default Line;
