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

const BookingPreview = (props) => {
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
          Title</label>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
        <label style={{ textAlign: 'center', color: 'white', fontSize: '1em' }}>
          Address</label>
      </div>
    </div>
    
    <div className='row' style={{ marginTop: '5%' }}>
      <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          12/28/2020
          </label>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          EDIT
        </label>
      </div>
      <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          12 PM - 4 PM
          </label>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          EDIT
        </label>
      </div>
      <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          NO EXTRAS
        </label>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em' }}>
          EDIT
        </label>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.5em', marginTop: '5%' }}>
          TOTAL: $180.00
          </label>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
        <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: '#308AB4', fontSize: '1em' }}>
          Stripe credits: $350.00
          </label>
      </div>
    </div>
    <div className='row' >
      <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
    
        <Button size="lg" style={{ backgroundColor: '#308AB4', border: 'none', marginTop: '5%' }}>
          Book
      </Button>
    
      </div>
    </div>
    </Container>
  )
}

export default BookingPreview;