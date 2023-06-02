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
  const [averageData, setAverageData] = useState({
    motorId: "",
    current: 0,
    freq: 0,
  });
  const [showAverage, setShowAverage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllData, setShowAllData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://qts.iitkgp.ac.in/last/gail/current/218"
        );
        const result = await response.json();
        setData(result); // Store all the fetched data
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

  const calculateAverage = () => {
    const recentData = data.slice(0, 100);
    const currentSum = recentData.reduce((sum, item) => sum + item.current, 0);
    const freqSum = recentData.reduce((sum, item) => sum + item.freq, 0);
    const currentAverage = currentSum / recentData.length;
    const freqAverage = freqSum / recentData.length;
    const motorId = recentData.length > 0 ? recentData[0].motor_id : "";
    setAverageData({
      motorId,
      current: currentAverage.toFixed(2),
      freq: freqAverage.toFixed(2),
    });
    setShowAverage(true);
  };

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

        <Button
          variant="contained"
          onClick={showAllDataHandler}
          sx={{
            mt: 2,
            mx: "auto",
            display: "block",
            backgroundColor: "#2cb1bc",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#1f827b",
            },
            minWidth: 150,
            fontSize: "14px",
            padding: "8px 16px",
            position: "relative",
          }}
        >
          {showAllData ? "Hide Data" : "Show All Data"}
        </Button>

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Serial No.</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
                <StyledTableCell align="right">Current</StyledTableCell>
                <StyledTableCell align="right">Frequency</StyledTableCell>
                <StyledTableCell align="right">Reading ID</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
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
                    <StyledTableCell align="right">
                      {item.Time}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.current}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.freq}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.Reading_id}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          onClick={calculateAverage}
          sx={{
            mt: 2,
            mx: "auto",
            display: "block",
            backgroundColor: "#2cb1bc",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#1f827b",
            },
            minWidth: 150,
            fontSize: "14px",
            padding: "8px 16px",
            position: "relative",
          }}
        >
          Calculate Average
        </Button>

        {showAverage && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="average table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Motor ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Current Average
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Frequency Average
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="center">
                    {data[0].motor_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {averageData.current}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {averageData.freq}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
              {["A", "B", "C", "D"].map((item) => (
                <StyledTableRow key={item}>
                  <StyledTableCell>Fault {item}</StyledTableCell>
                  <StyledTableCell>-</StyledTableCell>
                  <StyledTableCell>-</StyledTableCell>
                  <StyledTableCell>-</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </React.Fragment>
  );
};

export default MotorDetails;
