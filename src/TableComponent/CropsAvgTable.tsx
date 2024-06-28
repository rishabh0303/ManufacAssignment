import React from "react";
import { getAverageYieldAndArea } from "../utils/DataProcessing";
import { Table } from "@mantine/core";
import { CropData } from "../CropDto/CropDto";

interface Props {
  data: CropData[];
}

const CropsAverageTable: React.FC<Props> = ({ data }) => {
  const averageData = getAverageYieldAndArea(data);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Crop</Table.Th>
          <Table.Th>Average Yield (1950-2020)</Table.Th>
          <Table.Th>Average Cultivation Area (1950-2020)</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.keys(averageData).map((crop) => (
          <Table.Tr key={crop}>
            <Table.Td>{crop}</Table.Td>
            <Table.Td>{averageData[crop].yield.toFixed(3)}</Table.Td>
            <Table.Td>{averageData[crop].area.toFixed(3)}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default CropsAverageTable;
