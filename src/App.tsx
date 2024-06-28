import React from 'react';
import { Container } from '@mantine/core';
import CropsTable from './TableComponent/CropsTables';
import { transformData } from './utils/DataProcessing';
import CropsAverageTable from './TableComponent/CropsAvgTable';
import { dummyData } from './RawData/DummyData';
import { CropData } from './CropDto/CropDto';

const App: React.FC = () => {
  const data: CropData[] = transformData(dummyData);

  return (
    <Container>
      <h1>Agriculture Analytics</h1>
      <h2>Maximum and Minimum Production per Year</h2>
      <CropsTable data={data}/>
      <h2>Average Yield and Cultivation Area</h2>
      <CropsAverageTable data={data} />
    </Container>
  );
};

export default App;
