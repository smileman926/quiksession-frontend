import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import AliceCarousel from 'react-alice-carousel';
import { useRouter } from 'next/router'
import { CardContent, Container, Grid, Typography, Chip } from '@material-ui/core';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import styles from '../../styles/Booking.module.scss';
import StudioDetail from "../../components/StudioDetail";
import BookingEdit from "../../components/BookingEdit";
import BookingPreview from "../../components/BookingPreview";


const ArtistPage = () => {
  const router = useRouter()
  const { artist } = router.query
  const [view, setView] = useState('detail');

  const changeView = (view) => {
    setView(view);
  };

  console.log(artist);

  return (
    <div>

      <Head>
        <title>About QuikSession</title>
      </Head>
      { (view === "detail") ? <StudioDetail changeView={(view) => changeView(view)} /> : null }
      { (view === "edit") ? <BookingEdit changeView={(view) => changeView(view)} /> : null }
      { (view === "preview") ? <BookingPreview changeView={(view) => changeView(view)} /> : null }
    </div >
  )
}

export default ArtistPage;