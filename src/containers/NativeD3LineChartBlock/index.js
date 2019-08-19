import React, { useState } from 'react';
import NativeD3Line from 'charts/NativeD3Line';
import { generateData } from 'components/utils';

function NativeD3LineChartBlock() {
  const [pointsNumber, setPointsNumber] = useState(15);
  const data = generateData(pointsNumber);
  return (
    <div className="item">
      <div>
        <h2>Native D3 Line Chart</h2>
        <input
          type="number"
          value={pointsNumber}
          onChange={event => setPointsNumber(event.target.value)}
        />
      </div>
      <div>
        <NativeD3Line
          svgHeight={500}
          svgWidth={800}
          data={data}
          lineOptions={{ className: 'line' }}
          dotsOptions={{ className: 'dot', radius: 5 }}
        />
      </div>
      <div>
        <p>Right double click to exit zoom</p>
      </div>
    </div>
  );
}

export default NativeD3LineChartBlock;
