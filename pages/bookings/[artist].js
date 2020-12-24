import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss';
import { useRouter } from 'next/router'
import { CardContent, Container, Grid, Typography, Chip } from '@material-ui/core';
import AboutUsHeading from '../../components/AboutUsHeading/AboutUsHeading'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArcHeading from '../../components/ArcHeading/ArcHeading';
import AboutUsContent from '../../components/AboutUsContent/AboutUsContent';
import AboutPackages from '../../components/AboutPackeges/AboutPackages'

const ArtistPage = () => {
  const router = useRouter()
  const { artist } = router.query
  console.log(artist);
  
  const [value, setValue] = React.useState(2);

  return (
    <div>

      <Head>
        <title>About QuikSession</title>
      </Head>

      <div style={{
        height: 300,
        width: '100%',
        backgroundColor: '#308AB4',
        borderRadius: "0px 0px 0 150px",
      }}>

      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -150
      }}>
        <Container>
          <CardContent>
            <Grid container>
              <Grid item bg={4} md={4} sm={12} xs={12} style={{ zIndex: 9999 }}>
                <div style={{
                  display: 'flex',

                  flexDirection: 'column',
                  alignItems: 'center',

                }}>



                  <ArcHeading text="BLUE SOUTH" arc={200} radius={50} />



                  <div style={{
                    backgroundColor: '#A5A5A5',
                    height: 35,
                    width: 170,
                    marginTop: 20,
                    borderRadius: 45,

                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 20,
                    paddingRight: 10
                  }}>
                    <Grid item bg={8} md={8}
                      style={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography>32 Photos</Typography>
                    </Grid>
                    <Grid item bg={4} md={4}
                      style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <ArrowRightIcon style={{ fontSize: 40 }} />
                    </Grid>

                  </div>
                </div>
              </Grid>
              <Grid item bg={8} md={8} sm={12} xs={12} style={{ zIndex: 9999 }}>


                <AboutUsHeading
                  title="BLUE SOUTH STUDIOS"
                  subTitle="1423 Jameson Place Way, Atlanta GA, 30039"
                  rating={3} />



                <AboutUsContent content=" An example of rendering multiple Chips from an array of values.
                Deleting a chip removes it from the array. Note that since no onClick property
                is defined,
                the Chip can be focused, but does not gain depth while clicked or touched.
                  " />


                <AboutPackages />

              </Grid>
            </Grid>
          </CardContent>
        </Container>
      </div>




      <div style={{
        position: "absolute",
        bottom: -60,
        left: 50,
        transform: "translate(-50%, -50%)",
        height: 130,
        width: 250,
        borderRadius: "150px 150px 0 0",
        backgroundColor: "#308AB4",
      }}>

      </div>
      <div style={{
        position: "absolute",
        bottom: -60,
        right: -60,
        transform: "translate(-50%, -50%)",
        height: 130,
        width: 130,
        borderRadius: "160px 150px 0px 160px",
        backgroundColor: "#308AB4",
        zIndex: 0
      }}>

      </div>
      <div style={{
        position: "absolute",
        bottom: 30,
        right: -50,
        transform: "translate(-50%, -50%)",
        height: 220,
        width: 100,
        borderRadius: "160px 0px 0px 160px",
        background: "#308AB4 0% 0% no-repeat padding-box",
      }}>

      </div>



    </div >
  )
}

export default ArtistPage;