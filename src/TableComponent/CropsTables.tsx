import React from "react";
import { Table } from "@mantine/core";
import { getMaxMinProductionPerYear } from "../utils/DataProcessing";
import { CropData } from "../CropDto/CropDto";

interface Props {
  data: CropData[];
}

const CropsTable: React.FC<Props> = ({ data }) => {
  const maxMinData = getMaxMinProductionPerYear(data);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with Maximum Production in that year</Table.Th>
          <Table.Th>Crop with Minimum Production in that year</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.keys(maxMinData).map((year) => (
          <Table.Tr key={year}>
            <Table.Td>{year}</Table.Td>
            <Table.Td>{maxMinData[year]?.max}</Table.Td>
            <Table.Td>{maxMinData[year]?.min}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default CropsTable;
