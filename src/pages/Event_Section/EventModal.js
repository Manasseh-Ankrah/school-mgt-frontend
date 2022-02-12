import React, { useEffect, useState } from "react";
import "../../css/EventModal.css";
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
// import axios from "./axios";
// import Pusher from "pusher-js";

// Course Category select Object

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

const EventModal = ({ id, courseName, courseCategory, courseCode, completed }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   NEW
  const [pending, setPending] = React.useState(false);

  const changePending = () => {
    setPending(true);
    handleClose();
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
       {completed ? 
            <div>
            <div className="btn_search">
              <Button
                onClick={handleOpen}
                variant="contained"
                style={{
                  backgroundColor: completed ? "gray" : "#1976d2",
                }}
                className="pay"
              >
                {completed ? "Completed" : "Pending"}
              </Button>
            </div>
            </div>
      : 
     <div>
      <div className="btn_search">
        <Button
          onClick={handleOpen}
          variant="contained"
          style={{
            backgroundColor: completed ? "gray" : "#1976d2",
          }}
          className="pay"
        >
          {completed ? "Completed" : "Pending"}
        </Button>
      </div>

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Paper className="event_modal_paper">
          <Typography
            style={{ marginTop: 20, marginBottom: 20 }}
            variant="h5"
            component="h2"
            className="event_h2"
          >
            Mark Event as Completed
          </Typography>

          <Button variant="contained" onClick={changePending}>
            Done
          </Button>
        </Paper>
      </StyledModal>
      </div>
      }
    </div>
  );
};

export default EventModal;
