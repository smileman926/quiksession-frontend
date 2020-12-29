import React, { useState } from 'react';
import styles from './style.module.scss';
import Head from 'next/head'
import AliceCarousel from 'react-alice-carousel';
import { useRouter } from 'next/router'
import { CardContent, Container, Grid, Typography, Chip } from '@material-ui/core';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

import SelectBox from "../SelectBox";

const BookingEdit = (props) => {
  return(
    <Container className={styles.container_top + " " + styles.div_align_center}>
      <div className='row' >
        <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
          <h1 style={{ textAlign: 'center', color: 'white' }}>
            YOUR BOOKING</h1>
        </div>
      </div>

      <div className='row' >
        <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
          <label style={{ textAlign: 'center', color: '#308AB4', fontSize: '1em' }}>
            Address</label>
        </div>
      </div>

      <div className='row' style={{ marginTop: '5%' }}>
        <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6'>
          <div>
            <label style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
              SELECT A DATE
            </label>
          </div>
          <div className={'row' + " " + styles.justify_content} >
            <div className={styles.margingspace}>
              <SelectBox title="MONTH" />
            </div>
            <div style={{marginTop:'5%'}}>
              <p>
                To
            </p>
            </div>
            <div className={styles.margingspace}>
              <SelectBox title="DAY" />
            </div>
          </div>
        </div>
        <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6'>
          <div>
            <label style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
              SELECT A TIME
            </label>
          </div>
          <div className={'row' + " " + styles.justify_content} >
            <div className={styles.margingspace}>
              <SelectBox title="TIME" />
            </div>
            <div style={{marginTop:'5%'}}>
              <label style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
                To
            </label>
            </div>
            <div className={styles.margingspace}>
              <SelectBox title="TIME" />
            </div>
          </div>
        </div>

      </div>
      <div className='row' >
        <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em', marginTop: '5%' }}>
            EXTRAS
            </label>
        </div>
      </div>
      <div className='row' >
        <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6' style={{ textAlign: 'center' }}>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
            12/28/2020
            </label>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
            ADD
          </label>
        </div>
        <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6' style={{ textAlign: 'center' }}>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
            12/28/2020
            </label>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
            ADD
          </label>
        </div>
      </div>
      <div className='row' >
        <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6' style={{ textAlign: 'center' }}>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
            12/28/2020
            </label>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
            ADD
          </label>
        </div>
        <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6' style={{ textAlign: 'center' }}>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
            12/28/2020
            </label>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
            ADD
          </label>
        </div>
      </div>
      <div className='row' >
        <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>

          <Button size="lg" style={{ backgroundColor: '#308AB4', border: 'none', marginTop: '5%' }} onClick={() => props.changeView("preview")}>
            Review
        </Button>

        </div>
      </div>
      </Container>


  )
}

export default BookingEdit;