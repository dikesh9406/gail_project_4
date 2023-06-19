import * as React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2cb1bc", // Updated color
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableContainer = styled(Paper)(({ theme }) => ({
  maxHeight: 300,
  overflowY: "scroll",
}));

function createData(_id, motorStatus, motorType, createdAt) {
  return { _id, motorStatus, motorType, createdAt };
}

export default function Faults({ data }) {
  return (
    <React.Fragment>
     
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ color: "#651fff", mb: 2 }}
        >
          Motors
        </Typography>
        <TableContainer sx={{ m: 2 }}>
        <Table aria-label="customized table">
       
          <TableHead>
            <TableRow>
              <StyledTableCell>Motor ID</StyledTableCell>
              <StyledTableCell align="right">Motor Status</StyledTableCell>
              <StyledTableCell align="right">Motor Type</StyledTableCell>
              <StyledTableCell align="right">Created At</StyledTableCell>
              <StyledTableCell align="right">HealthCard</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...data].map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row._id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.motorStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.motorType}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.createdAt}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/healthCard/${row._id}`}>HealthCard</Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          
        </Table>
        </TableContainer>
      
    </React.Fragment>
  );
}
