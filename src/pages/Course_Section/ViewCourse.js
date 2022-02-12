import React, { useEffect } from "react";
import "../../css/ViewCourse.css";
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
import CourseModal from "./CourseModal";
import { useStateValue } from "../../State/StateProvider";
import Save from "@mui/icons-material/Save";
import axios from "../../axios";

// import Paper from "@mui/material/Paper";
// import TableInfo from "./TableInfo";

const courseCats = [
  {
    value: "Science",
  },
  {
    value: "Mathematics",
  },
  {
    value: "Social Sience",
  },
];

function ViewCourse() {
  const [course, setCourse] = React.useState("");
  const [courseCategory, setCourseCategory] = React.useState("");
  const [courseCode, setCourseCode] = React.useState("12345");
  const [{ adminToken, admin, student, staff, courseState }, dispatch] = useStateValue();


  const getCourseData = async () => {
    const req = await axios.get("/course/");
    // console.log(req);
    dispatch({
      type: "GET_COURSE_DATA",
      item: {
        courseState: req.data,
      },
    });
  };
  useEffect(() => {
    getCourseData();
  }, []);



  const changeCourse = (event) => {
    setCourse(event.target.value);
  };
  const changeCourseCat = (event) => {
    setCourseCategory(event.target.value);
  };

// onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!course || !courseCategory ) {
      alert("Fill all the form");
    } else if (!course) {
      alert("Enter a course");
    } else if (!courseCategory) {
      alert("Select a Category");
    }  else {
      try {
        const newCourse = { 
           "course": course,
           "courseCategory": courseCategory, 
           "courseCode":courseCode 
          };
        await axios.post("/course/register", newCourse).then(()=> {
          dispatch({
            type: "GET_COURSE_DATA",
            item: {
              courseState: [...courseState,newCourse],
            },
          });
          // alert("Inserted a new object >>",newEvent)
          setCourse("");
          setCourseCategory("");
        }).catch((err)=> {
          alert(err);
        })
      } catch (err) {
        console.log(err);
      }
    }
  };

  const rows = courseState.map(
    ({ _id, course, courseCategory, courseCode }) => {
      // const id = newId;
      return { _id, course, courseCategory, courseCode };
    }
  );

  return (
    <div className="viewCourse">
      <Paper className="viewCourse_paper" elevetion={3}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          className="viewCourse_box "
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Course Name"
              id="outlined-size-normal"
              value={course}
              className="viewCourse_input"
              onChange={changeCourse}
            />
          </div>

          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Course Category"
              value={courseCategory}
              onChange={changeCourseCat}
              className="viewCourse_input"
            >
              {courseCats.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="btn_search">
            <Button
              onClick={onSubmit}
              variant="contained"
              startIcon={<Save />}
              className="save"
              // color="success"
            >
              Save
            </Button>
          </div>
        </Box>
      </Paper>

      <div className="viewCourse_results">
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="results_text"
        >
          Saved Courses
        </Typography>
      </div>
      <div className="course_tblInfo">
        <TableContainer className="viewCourse_tblcontainer">
          <Table className="app__table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Course</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Code</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.course}</TableCell>
                  <TableCell align="left">{row.courseCategory}</TableCell>
                  <TableCell align="left">{row.courseCode}</TableCell>
                  <TableCell align="left">
                    <div className="option_btn">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        // onClick={() => onDelete(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <CourseModal
                        id={row._id}
                        courseName={row.course}
                        courseCategory={row.courseCategory}
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

export default ViewCourse;
