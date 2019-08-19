import React, { useRef } from 'react';
import { axisLeft, select } from 'd3';
import { RenderLifeCycle } from 'hooks/renderLifeCycle';

const AxisY = props => {
  const gRef = useRef(null);
  const draw = () =>
    gRef.current && select(gRef.current).call(axisLeft(props.scale));

  RenderLifeCycle({
    firstRender: () => draw(),
    updateRender: () => draw(),
  });

  return <g ref={gRef} />;
};

export default AxisY;
