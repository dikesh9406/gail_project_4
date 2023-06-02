import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Button, CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2cb1bc",
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MotorDetails = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllData, setShowAllData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hello");
        const response = await axios.get(`/api/v1/motor/proxy`);
        setData(response.data); // Store all the fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
   };

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const showAllDataHandler = () => {
    setShowAllData(!showAllData);
  };

  const displayedData = showAllData ? data : data.slice(0, 5);

  return (
    <React.Fragment>
      <Paper sx={{ m: 2 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{
            color: "#ffffff",
            backgroundColor: "#2cb1bc",
            display: "block",
            padding: "5px 10px",
            borderRadius: "5px",
            marginBottom: "10px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          Recent data of Motor ID: {data.length > 0 ? data[0].motor_id : ""}
        </Typography>

        
        <TableContainer component={Paper} style={{ maxHeight: "300px" }}>
            <Table aria-label="customized table">
              <TableHead style={{ maxHeight: "300px",   overflowY: "fixed" }}>
                <TableRow>
                  <StyledTableCell>Serial No.</StyledTableCell>
                  <StyledTableCell align="right">Time</StyledTableCell>
                  <StyledTableCell align="right">Current</StyledTableCell>
                  <StyledTableCell align="right">Frequency</StyledTableCell>
                  <StyledTableCell align="right">Fault Frequency</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ maxHeight: "240px", overflowY: "scroll" }}>
                {isLoading ? (
                  <TableRow >
                    <TableCell colSpan={5} align="center">
                      <CircularProgress
                        color="primary"
                        sx={{ color: "#2cb1bc" }}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedData.map((item, index) => (
                    <StyledTableRow key={item.Reading_id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="right">{item.Time}</StyledTableCell>
                      <StyledTableCell align="right">
                        {item.current}
                      </StyledTableCell>
                      <StyledTableCell align="right">{item.freq}</StyledTableCell>
                      <StyledTableCell align="right">
                        __
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
           
         
          </TableContainer>
          <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{
            color: "#ffffff",
            backgroundColor: "#2cb1bc",
            display: "block",
            padding: "5px 10px",
            borderRadius: "5px",
            marginBottom: "10px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop:"20px",
            textAlign: "center",
          }}
        >
          Fault Data Of Motor
        </Typography>
       
        <TableContainer component={Paper} sx={{ mt: 2 }}>
        
          <Table aria-label="new table">
            
            <TableHead>
              <TableRow>
                <StyledTableCell>Fault Type</StyledTableCell>
                <StyledTableCell>Faults in last 1 week</StyledTableCell>
                <StyledTableCell>Faults in last 1 month</StyledTableCell>
                <StyledTableCell>Faults in last 1 year</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                "Broken Rotor Bar",
                "Broken End Ring",
                "Eccentricity",
                "Bearing Fault",
                "Inter-turn Short Circuit",
              ].map((item) => (
                <StyledTableRow key={item}>
                  <StyledTableCell>{item}</StyledTableCell>
                  <StyledTableCell>-</StyledTableCell>
                  <StyledTableCell>-</StyledTableCell>
                  <StyledTableCell>-</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       
    

    
      </Paper>
      <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{
            color: "#ffffff",
            backgroundColor: "#2cb1bc",
            display: "block",
            padding: "25px 50px",
            borderRadius: "5px",
            marginBottom: "10px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            // marginTop: "20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          RUL of Motor:____
        </Typography>
      
    </React.Fragment>
    
  );
};

export default MotorDetails;
