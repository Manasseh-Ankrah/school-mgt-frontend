import React, { useEffect } from "react";
import "../../css/ViewStudent.css";
import { Paper, Button, CircularProgress, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Search from "@mui/icons-material/Search";
import Pen from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StudentModal from "../Student_Section/StudentModal";
import { useStateValue } from "../../State/StateProvider";
import axios from "../../axios";


// import Paper from "@mui/material/Paper";
// import TableInfo from "./TableInfo";

// Courses select Object
const courses = [
  {
    value: "All Courses",
  },
  {
    value: "Database",
  },
  {
    value: "Software Eng.",
  },
  {
    value: "Computer Science",
  },
  {
    value: "Networking",
  },
  {
    value: "Web Development",
  },
  {
    value: "Cyber security",
  },
];

// Level select Object
const levels = [
  {
    value: "All Levels",
  },
  {
    value: "Diploma",
  },
  {
    value: "Advanced Diploma",
  },
  {
    value: "NCC-Level 3",
  },
  {
    value: "NCC-Level 4",
  },
  {
    value: "NCC-Level 5",
  },
  {
    value: "NCC-Level 6",
  },
];

function ViewStudent() {
  const [courseTitle, setCourseTitle] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [data, setData] = React.useState(false);
  const [{ adminToken, admin, studentState }, dispatch] = useStateValue();
  console.log("Student object recieved successfully", studentState);

  const getStudentData = async () => {
    const req = await axios.get("/student/");
    // console.log(req);
    dispatch({
      type: "GET_STUDENT_DATA",
      item: {
        studentState: req.data,
      },
    });
  };
  useEffect(() => {
    getStudentData();
  }, []);



  const changeCourseTitle = (event) => {
    setCourseTitle(event.target.value);
  };

  const changeLevel = (event) => {
    setLevel(event.target.value);
  };

  const onSearch = () => {
    setData(!data);
    console.log("Hello world");
  };

  const rows = studentState.map(
    ({
      fName,
      lName,
      date,
      courseTitle,
      level,
      email,
    }) => {
      // const id = newId;
      return {
        fName,
        lName,
        date,
        courseTitle,
        level,
        email,
      };
    }
  );

  return (
    <div className="viewStudent">
      <Paper className="viewStudent_paper" elevetion={3}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          className="viewStudent_box "
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Course Title"
              value={courseTitle}
              onChange={changeCourseTitle}
              // helperText="Please select your currency"
              className="viewStudent_input"
            >
              {courses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Level"
              value={level}
              onChange={changeLevel}
              // helperText="Please select your currency"
              className="viewStudent_input"
            >
              {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
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

      <div className="viewStudent_results">
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="results_text"
        >
          Student Information
        </Typography>
      </div>
      <div className="student_tblInfo">
        <TableContainer className="viewStudent_tblcontainer">
          <Table className="app__table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">First</TableCell>
                <TableCell align="left">Last</TableCell>
                <TableCell align="left">DOB</TableCell>
                <TableCell align="left">Course</TableCell>
                <TableCell align="left">Level</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.fName}</TableCell>
                  <TableCell align="left">{row.lName}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">{row.courseTitle}</TableCell>
                  <TableCell align="left">{row.level}</TableCell>
                  <TableCell align="left">
                    <div className="option_btn">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        // onClick={() => onDelete(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <StudentModal
                        id={row._id}
                        fName={row.fName}
                        lName={row.lName}
                        course={row.course}
                        dob={row.date}
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

export default ViewStudent;
