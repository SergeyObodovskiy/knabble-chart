import React  from 'react';
import './index.scss';
import NativeD3LineChartBlock from 'containers/NativeD3LineChartBlock';
import LineChartBlock from 'containers/LineChartBlock';

function AppLayout() {
  return (
    <div className="main">
      <NativeD3LineChartBlock />
      <LineChartBlock />
    </div>
  );
}

export default AppLayout;
