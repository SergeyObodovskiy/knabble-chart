import React, { useRef } from 'react';
import { axisBottom, select } from 'd3';
import { RenderLifeCycle } from 'hooks/renderLifeCycle';

const AxisX = props => {
  const gRef = useRef(null);
  const draw = () =>
    gRef.current && select(gRef.current).call(axisBottom(props.scale));

  RenderLifeCycle({
    firstRender: () => draw(),
    updateRender: () => draw(),
  });

  return <g transform={`translate(0,${props.height})`} ref={gRef} />;
};

export default AxisX;
