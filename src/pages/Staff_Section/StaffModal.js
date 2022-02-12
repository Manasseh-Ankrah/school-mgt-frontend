import React, { useEffect, useState } from "react";
import "../../css/StaffModal.css";
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

// Qualifications select Object
const qualifications = [
  {
    value: "Diploma",
  },
  {
    value: "Advance Diploma",
  },
  {
    value: "HND",
  },
  {
    value: "Degree",
  },
  {
    value: "Masters",
  },
  {
    value: "PHD",
  },
];

const StaffModal = ({
  fName,
  lName,
  id,
  role,
  salary,
  qualification,
  experience,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   NEW
  const [updateFirst, setUpdateFirst] = React.useState(fName);
  const [updateLast, setUpdateLast] = React.useState(lName);
  const [updateRole, setUpdateRole] = React.useState(role);
  const [updateQualification, setUpdateQualification] =
    React.useState(qualification);
  const [updateSalary, setUpdateSalary] = React.useState(salary);

  const changeFirst = (event) => {
    setUpdateFirst(event.target.value);
  };
  const changeLast = (event) => {
    setUpdateLast(event.target.value);
  };
  //   const changeRole = (event) => {
  //     setUpdateRole(event.target.value);
  //   };
  const changeQualification = (event) => {
    setUpdateQualification(event.target.value);
  };
  const changeSalary = (event) => {
    setUpdateSalary(event.target.value);
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
                label="Qualification"
                value={updateQualification}
                onChange={changeQualification}
                // helperText="Please select your currency"
                className="modal_input"
              >
                {qualifications.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                label="Salary"
                id="outlined-size-normal"
                value={updateSalary}
                className="modal_input"
                onChange={changeSalary}
              />
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

export default StaffModal;
