import React, { useEffect } from "react";
import "../../css/ViewEvent.css";
import { Paper, Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Save from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EventModal from "./EventModal";
import axios from "../../axios";
import { useStateValue } from "../../State/StateProvider";

function ViewEvent() {
  const [event, setEvent] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [completed, setCompleted] = React.useState(false);
  const [{ adminToken, admin, student, staff, events }, dispatch] = useStateValue();
  

  const getEventData = async () => {
    const req = await axios.get("/event/");
    dispatch({
      type: "GET_EVENT_DATA",
      item: {
        events: req.data,
      },
    });
  };
  useEffect(() => {
    getEventData()  
  }, [])
  



  const changeEvent = (event) => {
    setEvent(event.target.value);
  };
  const changeDate = (event) => {
    setEventDate(event.target.value);
  };

  // onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!event || !eventDate ) {
      alert("Fill all the form");
    } else if (!event) {
      alert("Enter a event");
    } else if (!eventDate) {
      alert("Select a date");
    }  else {
      try {
        const newEvent = { 
           "event": event,
           "eventDate": eventDate, 
           "completed":completed 
          };
        await axios.post("/event/register", newEvent).then(()=> {
          dispatch({
            type: "GET_EVENT_DATA",
            item: {
              events: [...events,newEvent],
            },
          });
          // alert("Inserted a new object >>",newEvent)
          setEvent("");
          setEventDate("");
        }).catch((err)=> {
          alert(err);

        })
      } catch (err) {
        console.log(err);
      }
    }
  };



  const rows = events.map(({ _id, event, eventDate, completed}) => {
    // const id = newId;
    return { _id, event, eventDate, completed};
  });

  return (
    <div className="viewEvent">
      <Paper className="viewEvent_paper" elevetion={3}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          className="viewEvent_box"
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Event"
              id="outlined-size-normal"
              value={event}
              className="viewEvent_input"
              onChange={changeEvent}
            />
          </div>
          <div>
            <TextField
              id="outlined-size-normal"
              value={eventDate}
              type="date"
              className="viewEvent_input"
              onChange={changeDate}
            />
          </div>{" "}
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

      <div className="viewEvent_results">
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="results_text"
        >
          Events List
        </Typography>
      </div>

      <div className="tblInfo">
        <TableContainer className="viewEvent_tblcontainer">
          <Table className="app__table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Event</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.event}</TableCell>
                  <TableCell align="left">{row.eventDate}</TableCell>
                  <TableCell align="left">
                    <div className="option_btn">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "red" }}
                        // onClick={() => onDelete(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <EventModal id={row._id} text={row.event} date={row.eventDate} completed={row.completed} />
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

export default ViewEvent;
