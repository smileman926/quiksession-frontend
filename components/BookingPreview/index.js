import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import Head from 'next/head'
import AliceCarousel from 'react-alice-carousel';
import { useRouter } from 'next/router'
import { CardContent, Container, Grid, Typography, Chip } from '@material-ui/core';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { createBook } from "../../services";
import moment from "moment";

const BookingPreview = (props) => {
  const router = useRouter();

  const [date, setDate] = useState(props.bookingDetail.date);
  const [time, setTime] = useState(props.bookingDetail.time);
  const [total, setTotal] = useState(props.bookingDetail.total);
  const [userDetail, setUserDetail] = useState(props.bookingDetail.total);
  const [fund, setFund] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      const temp = JSON.parse(localStorage.getItem("auth"));
      setUserDetail(temp);
      const credit = moment.duration(moment(`${props.bookingDetail.date} ${props.bookingDetail.endTime}:00`).diff(moment(`${props.bookingDetail.date} ${props.bookingDetail.startTime}:00`))).asHours();
      if (props.studioDetail.price * credit < temp.user.credit) {
        setFund(false);
      } else {
        setFund(true);
      }
    }
  }, []);


  const bookNow = async () => {
    try {
      const credit = moment.duration(moment(`${props.bookingDetail.date} ${props.bookingDetail.endTime}:00`).diff(moment(`${props.bookingDetail.date} ${props.bookingDetail.startTime}:00`))).asHours();
      if (props.studioDetail.price * credit < userDetail.user.credit) {
        await createBook({
          ArtistId: (props.userDetail && props.userDetail.user && props.userDetail.user.id),
          ProjectId: (props.studioDetail && props.studioDetail.id),
          Subject: "Booked Done",
          TaskId: (props.studioDetail && props.studioDetail.room && props.studioDetail.room[0] && props.studioDetail.room[0]._id),
          IsAllDay: false,
          BookStatus: "Booked",
          StartTime: moment(`${props.bookingDetail.date} ${props.bookingDetail.startTime}:00`).toISOString(),
          EndTime: moment(`${props.bookingDetail.date} ${props.bookingDetail.endTime}:00`).toISOString(),
          Credits: props.studioDetail.price * credit
        })
        alert("You booking was sucessfull!");
        if (localStorage.getItem("auth")) {
          const temp = JSON.parse(localStorage.getItem("auth"));
          temp.user.credit = temp.user.credit * 1.0 - (props.studioDetail.price * credit) * 1.0;
          localStorage.setItem("auth", JSON.stringify(temp));
        }
        router.push({
          pathname: '/'
        });
      } else {
        document.getElementById("payout").click();
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const addFund = () => {
    props.changeView("edit")
    document.getElementById("payout").click();
  };

  return(
    <Container className={styles.container_top + " " + styles.div_align_center}>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
        <label style={{ textAlign: 'center', color: '#308AB4', fontSize: '2em', marginTop: '5%' }}>
          YOUR BOOKING</label>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
        <label style={{ textAlign: 'center', color: 'white', fontSize: '1.8em', marginTop: '1%' }}>
        { (props.studioDetail && props.studioDetail.name) }  
        </label>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
        <label style={{ textAlign: 'center', color: 'white', fontSize: '1em' }}>
        { (props.studioDetail && props.studioDetail.address) }  </label>
      </div>
    </div>
    
    <div className='row' style={{ marginTop: '5%' }}>
      <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          {date}
          </label>
        <label onClick={() => props.changeView("edit")} className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          EDIT
        </label>
      </div>
      <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          {time}
          </label>
        <label onClick={() => props.changeView("edit")} className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          EDIT
        </label>
      </div>
      <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          NO EXTRAS
        </label>
        <label onClick={() => props.changeView("edit")} className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          EDIT
        </label>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em', marginTop: '5%' }}>
          TOTAL: ${total}
          </label>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: '#308AB4', fontSize: '1em' }}>
          Stripe credits: ${(userDetail && userDetail.user && userDetail.user.credit)}
          </label>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
    
       { fund ? <Button size="lg" onClick={addFund} style={{ backgroundColor: '#308AB4', border: 'none', marginTop: '5%' }}>
          Add fund
      </Button> : null }
      { !fund ? 
        <Button size="lg" onClick={bookNow} style={{ backgroundColor: '#308AB4', border: 'none', marginTop: '5%' }}>
          Book
      </Button> : null }
    
      </div>
    </div>
    </Container>
  )
}

export default BookingPreview;