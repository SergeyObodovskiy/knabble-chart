import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3';
import { RenderLifeCycle } from 'hooks/renderLifeCycle';

const Dot = props => {
  const cRef = useRef(null);
  const { xScale, yScale, datum, className, radius } = props;
  const draw = () =>
    cRef.current &&
    select(cRef.current)
      .attr('class', className)
      .attr('cx', () => {
        return xScale(datum[0]);
      })
      .attr('cy', () => {
        return yScale(datum[1]);
      })
      .attr('r', radius);

  RenderLifeCycle({
    firstRender: () => draw(),
    updateRender: () => draw(),
  });

  return <circle ref={cRef} />;
};

Dot.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  datum: PropTypes.array.isRequired,
  className: PropTypes.string,
  radius: PropTypes.number,
};

Dot.defaultProps = {
  className: 'dot',
  radius: 5,
};

function Dots(props) {
  const { data, ...dotsProps } = props;
  const dots = data.map((datum, index) => (
    <Dot key={index} {...dotsProps} datum={datum} />
  ));

  return dots;
}

export default Dots;
