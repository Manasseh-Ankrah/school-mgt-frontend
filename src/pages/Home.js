import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../component/Card";
import { useStateValue } from "../State/StateProvider";
import axios from ".././axios";
// import Cards from "../component/Cards";
import "../css/Home.css";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import PersonIcon from "@mui/icons-material/Person";
import ManIcon from "@mui/icons-material/Man";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {DougChart} from "../Charts/DougChart";
import {LineChart} from "../Charts/LineChart";

import "../css/Card.css";
import { Container, Grid, Paper } from "@mui/material";

function Home() {
  const [{ adminToken, admin, student, staff, events }, dispatch] = useStateValue();
  const history = useNavigate();


  const getStaffData = async () => {
    const req = await axios.get("/staff/");
    // console.log(req);
    dispatch({
      type: "GET_STAFF_DATA",
      item: {
        staff: req.data,
      },
    });
  };


  useEffect(() => {
    getStaffData();
  }, []);

  // console.log(student[0].address);
  const [eventTitle, setEventTitle] = React.useState([
    {
      id: 1,
      text: "Examination Week",
      date: "2022/01/28",
    },
    {
      id: 2,
      text: "Exhibition Day",
      date: "2028/07/28",
    },
    {
      id: 3,
      text: "Vacation",
      date: "2014/10/28",
    },
  ]);

  // useEffect(() => {
  //   if (!admin.id) {
  //     console.log("No admin logged In");
  //     history("/");
  //   } else {
  //     console.log("Logged In");
  //   }
  // }, []);

  const rows = eventTitle.map(({ id, text, date }) => {
    // const id = newId;
    return { id, text, date };
  });

  return (
    <div className="home">
      <Paper className="home__paper" elevetion={3}>
        <div className="home__container">
          <Card
            count="500"
            title="Students"
            Icon={<PersonIcon className="card__icon" />}
            clsnm="card__student"
          />
          <Card
            count="20"
            title="Courses"
            Icon={<MenuBookIcon className="card__icon" />}
            clsnm="card__courses"
          />
          <Card
            count="30"
            title="Teachers"
            Icon={<ManIcon className="card__icon" />}
            clsnm="card__teacher"
          />{" "}
          <Card
            count="60"
            title="Events"
            Icon={<NotificationsActiveIcon className="card__icon" />}
            clsnm="card__event"
          />
        </div>
      </Paper>
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
            <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LineChart sx={{ height: '100%' }} />
          </Grid>
      <Grid
            item
            lg={4}
            md={12}
            xl={3}
            xs={12}
          >
            <DougChart sx={{ height: '100%' }} />
          </Grid>
          </Grid>
          </Container>
    </div>
  );
}
export default Home;

// https://github.com/mars/create-react-app-buildpack
