import React, { useEffect, useState } from "react";
import "../../css/StudentModal.css";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import {
  Button,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
// import axios from "./axios";
// import Pusher from "pusher-js";

// Level select Object
const levels = [
  {
    value: "Diploma",
  },
  {
    value: "Advanced-Diploma",
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

// Course select Object
const courses = [
  {
    value: "Database",
  },
  {
    value: "Software-Eng.",
  },
  {
    value: "Computer-Science",
  },
  {
    value: "Networking",
  },
  {
    value: "Web-Development",
  },
  {
    value: "Cyber-Security",
  },
];

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

// const style = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   width: 600,
//   bgcolor: "background.paper",
//   border: "1px solid #000",
//   p: 2,
//   px: 4,
//   pb: 3,
// };

const Modal = ({ fName, lName, id, dob, course, level }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   NEW
  const [updateFirst, setUpdateFirst] = React.useState(fName);
  const [updateLast, setUpdateLast] = React.useState(lName);
  const [updateDate, setUpdateDate] = React.useState(dob);
  const [updateCourse, setUpdateCourse] = React.useState(course);
  const [updateLevel, setUpdateLevel] = React.useState(level);

  const changeFirst = (event) => {
    setUpdateFirst(event.target.value);
  };
  const changeLast = (event) => {
    setUpdateLast(event.target.value);
  };
  const changeDate = (event) => {
    setUpdateDate(event.target.value);
  };
  const changeCourse = (event) => {
    setUpdateCourse(event.target.value);
  };
  const changeLevel = (event) => {
    setUpdateLevel(event.target.value);
  };

  //   useEffect(() => {
  //     const pusher = new Pusher("3f4a53efe35be9da4c17", {
  //       cluster: "eu",
  //     });
  //     const channel = pusher.subscribe("cards");

  //     channel.bind("updated", changeTask);
  //   }, []);

  const onUpdate = (e) => {
    console.log("hey");
    // console.log(updateId);
    // console.log(updateName);

    // e.preventDefault();
    // if (!updateName.length) {
    //   return;
    // }

    // const newCard = {
    //   name: updateName,
    // };

    // axios({
    //   method: "patch",
    //   url: `/tinder/cards/${updateId}`,
    //   data: newCard,
    // });

    // setUpdateName("");
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="edit"
        style={{ color: "turquoise" }}
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Paper className="modal__paper">
          {/* <h2 id="unstyled-modal-title">Text in a modal</h2> */}
          {/* <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p> */}
          <Typography
            style={{ marginTop: 20, marginBottom: 20 }}
            variant="h5"
            component="h2"
          >
            Edit Details
          </Typography>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="modal_box"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="First Name"
                id="outlined-size-normal"
                value={updateFirst}
                className="modal_input"
                onChange={changeFirst}
              />
            </div>
            <div>
              <TextField
                label="Last Name"
                id="outlined-size-normal"
                value={updateLast}
                className="modal_input"
                onChange={changeLast}
              />
            </div>
          </Box>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            className="modal_box"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Level"
                value={updateLevel}
                onChange={changeLevel}
                // helperText="Please select your currency"
                className="modal_input"
              >
                {levels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <div>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Course"
                  value={updateCourse}
                  onChange={changeCourse}
                  // helperText="Please select your currency"
                  className="modal_input"
                >
                  {courses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </Box>

          <Button variant="contained" onClick={onUpdate}>
            Save
          </Button>
        </Paper>
      </StyledModal>
    </div>
  );
};

export default Modal;
