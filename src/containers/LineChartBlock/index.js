import React, { useState } from 'react';
import LinerChart from 'charts/Line';
import { generateData } from 'components/utils';

function LineChartBlock() {
  const [pointsNumber, setPointsNumber] = useState(15);
  const data = generateData(pointsNumber);
  return (
    <div className="item">
      <div>
        <h2>Line chart based on React components(without interaction*)</h2>
        <input
          type="number"
          value={pointsNumber}
          onChange={event => setPointsNumber(event.target.value)}
        />
      </div>
      <div>
        <LinerChart
          svgHeight={500}
          svgWidth={800}
          data={data}
          lineOptions={{ className: 'line' }}
          dotsOptions={{ className: 'dot', radius: 5 }}
        />
      </div>
      <div>
        <p style={{ color: 'red' }}>
          * This chart only to test render performance. This chart is drawn more
          than 2 times slower with the number of points 1000. With a test of
          5000 points, the result is rendering more than 4 times slower
        </p>
      </div>
    </div>
  );
}

export default LineChartBlock;
