import React from "react";
import "../../css/ViewStaff.css";
// import "../../css/ViewStudent.css";
import { Paper, Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Search from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StaffModal from "../Staff_Section/StaffModal";
import { useStateValue } from "../../State/StateProvider";

// roles select Object
const roles = [
  {
    value: "Teacher",
  },
  {
    value: "Accountant",
  },
  {
    value: "IT Technician",
  },
  {
    value: "Security Guard",
  },
  {
    value: "Cleaner",
  },
  {
    value: "Gardener",
  },
];
function ViewStaff() {
  const [role, setRole] = React.useState("");
  //   const [level, setLevel] = React.useState("");
  const [data, setData] = React.useState(false);
  const [{ adminToken, admin, student, staff }, dispatch] = useStateValue();

  const changeRole = (event) => {
    setRole(event.target.value);
  };

  const onSearch = () => {
    setData(!data);
    console.log("Hello world");
  };

  const rows = staff.map(
    ({ first_name, last_name, role, qualification, salary, experience }) => {
      // const id = newId;
      return { first_name, last_name, role, qualification, salary, experience };
    }
  );
  return (
    <div className="viewStaff">
      <Paper className="viewStaff_paper" elevetion={3}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          className="viewStaff_box"
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Role"
              value={role}
              onChange={changeRole}
              // helperText="Please select your currency"
              className="viewStaff_input"
            >
              {roles.map((option) => (
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

      <div className="viewStaff_results">
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="results_text"
        >
          RESULTS
        </Typography>
      </div>

      <div className="staff_tblInfo">
        <TableContainer className="viewStaff_tblcontainer">
          <Table className="app__table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">First</TableCell>
                <TableCell align="left">Last</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Qual.</TableCell>
                <TableCell align="left">Salary</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.first_name}</TableCell>
                  <TableCell align="left">{row.last_name}</TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell align="left">{row.qualification}</TableCell>
                  <TableCell align="left">{row.salary}</TableCell>
                  <TableCell align="left">
                    <div className="option_btn">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        // onClick={() => onDelete(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <StaffModal
                        id={row.id}
                        fName={row.first_name}
                        lName={row.last_name}
                        role={row.role}
                        salary={row.salary}
                        qualification={row.qualification}
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

export default ViewStaff;
