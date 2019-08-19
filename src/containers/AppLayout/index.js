import React, { useState } from 'react';
import LinerChart from 'charts/Line';
import NativeD3Line from 'charts/NativeD3Line';
import { generateData } from 'components/utils';
import './index.scss';
import NativeD3LineChartBlock from "containers/NativeD3LineChartBlock";
import LineChartBlock from "containers/LineChartBlock";

function AppLayout() {
  const [pointsNumber, setPointsNumber] = useState(15);
  const [pointsNumber2, setPointsNumber2] = useState(15);
  const data = generateData(pointsNumber);
  const data2 = generateData(pointsNumber2);
  return (
    <div className="main">
      <NativeD3LineChartBlock />
      <LineChartBlock />
    </div>
  );
}

export default AppLayout;
