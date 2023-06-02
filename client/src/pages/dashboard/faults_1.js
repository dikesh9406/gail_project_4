import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #651fff;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
`;

const Heading = styled.h1`
  text-align: center;
  color: #651fff;
  margin-bottom: 16px;
`;

const Faults = ({ data }) => {
  return (
    <Container>
      <Heading>Recent Faults</Heading>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Motor Name</TableCell>
            <TableCell>Motor Brand</TableCell>
            <TableCell>Motor Location</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>HealthCard</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.motorName}</TableCell>
              <TableCell>{row.motorBrand}</TableCell>
              <TableCell>{row.motorLocation}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>
                <Link to={`/healthCard/${row[0]}`}>HealthCard</Link>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Faults;
