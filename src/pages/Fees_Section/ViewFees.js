import React from "react";
import "../../css/ViewFees.css";
import { Paper, Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Search from "@mui/icons-material/Search";
// import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
// import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FeesModal from "../Fees_Section/FeesModal";

function ViewFees() {
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [data, setData] = React.useState(false);
  const [studentObj, setStudentObj] = React.useState([
    {
      id: 1,
      fName: "Manasseh",
      lName: "Ankrah",
      dob: "01/25/2022",
      course: "Software-Eng",
      email: "solommonankrah24@gmail.com",
      level: "Diploma",
    },
    {
      id: 2,
      fName: "Elorm",
      lName: "Ansah",
      dob: "2015/01/7",
      course: "Database",
      email: "e_ansah@gmail.com",
      level: "NCC-Level 6",
    },
    {
      id: 3,
      fName: "Bob",
      lName: "Wright",
      dob: "1960/05/20",
      course: "Cyber-Security",
      email: "bob123@gmail.com",
      level: "NCC-Level 3",
    },
  ]);

  const changeFName = (event) => {
    setFName(event.target.value);
  };
  const changeLName = (event) => {
    setLName(event.target.value);
  };

  const onSearch = () => {
    setData(!data);
    console.log("Hello world");
  };

  const rows = studentObj.map(({ fName, lName, dob, course, level, email }) => {
    // const id = newId;
    return { fName, lName, dob, course, level, email };
  });
  return (
    <div className="viewFees">
      <Paper className="viewFees_paper" elevetion={3}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          className="viewFees_box"
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="First Name"
              id="outlined-size-normal"
              value={fName}
              className="viewFees_input"
              onChange={changeFName}
            />
          </div>
          <div>
            <TextField
              label="Last Name"
              id="outlined-size-normal"
              value={lName}
              className="viewFees_input"
              onChange={changeLName}
            />
          </div>

          <div className="btn_search">
            <Button
              onClick={onSearch}
              variant="contained"
              startIcon={<Search />}
              className="save"
              // color="success"
            >
              Search
            </Button>
          </div>
        </Box>
      </Paper>

      <div className="viewFees_results">
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="results_text"
        >
          Payment Information
        </Typography>
      </div>
      <div className="fees_tblInfo">
        <TableContainer className="viewFees_tblcontainer">
          <Table className="app__table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">First</TableCell>
                <TableCell align="left">Last</TableCell>
                <TableCell align="left">Course</TableCell>
                <TableCell align="left">Level</TableCell>
                <TableCell align="left">Fees Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.fName}</TableCell>
                  <TableCell align="left">{row.lName}</TableCell>
                  <TableCell align="left">{row.course}</TableCell>
                  <TableCell align="left">{row.level}</TableCell>
                  <TableCell align="left">
                    <div className="option_btn">
                      {/* <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        onClick={() => onDelete(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton> */}

                      <FeesModal
                        id={row.id}
                        fName={row.fName}
                        lName={row.lName}
                        course={row.course}
                        dob={row.dob}
                        level={row.level}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ViewFees;
