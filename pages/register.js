import Head from 'next/head'
import styles from '../styles/Register.module.scss';
import clsx from 'clsx';
import FormInputComponent from '../components/FormControls/FormInputComponent';
import { useState, useEffect } from 'react';
import { Grid, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import FormButtonComponent from '../components/FormControls/FormButtonComponent';
import FormAddImage from '../components/FormControls/FormAddImage';
import { validateEmail } from '../utils/validation';
import { useAlert } from 'react-alert';
import { register } from "../services";
import { useRouter } from "next/router";
import { Storage } from 'aws-amplify';
import { AccountCircle } from "@material-ui/icons";
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from 'react-bootstrap/Button';

const RegisterPage = () => {

  const alert = useAlert();
  const history = useRouter();

  const [signUpInfo, setSignUpInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPass: '',
    image: null
  });
  const [activeImage, setActiveImage] = useState(null);

  const [role, setRole] = useState("");
  const [credit, setCredit] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false
  });

  const imageUploadToS3 = async file => {
    const stored = await Storage.put("users-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "-" + file.name, file, {
      contentType: file.type,
      cacheControl: 'max-age=31536000'
    });
    return stored.key;
  }

  const handleEmailChange = (e) => {
    setIsInvalid({
      ...isInvalid,
      email: false
    });
    setSignUpInfo({ ...signUpInfo, email: e.target.value });
  }

  const submitRegister = async (e) => {
    if (isLoading)
      return;

    e.preventDefault();

    if (!validateEmail(signUpInfo.email)) {
      setIsInvalid({
        ...isInvalid,
        email: true
      });
      return;
    }

    if (signUpInfo.email !== signUpInfo.confirmEmail) {
      alert.error("Email confirmation");
      return;
    }

    if (signUpInfo.password !== signUpInfo.confirmPass) {
      alert.error("Password confirmation");
      return;
    }

    if (role.length < 1) {
      alert.error("Select role");
      return;
    }

    let userPhoto = null;

    setIsLoading(true);

    if (activeImage)
      userPhoto = await imageUploadToS3(activeImage);

    try {
      await register({
        name: signUpInfo.firstName + " " + signUpInfo.lastName,
        email: signUpInfo.email,
        password: signUpInfo.password,
        role: role,
        credit: credit,
        userPhoto: userPhoto
      })
        .then((data) => {
          if (data.userId && data.url && data.role === "owner") {
            localStorage.setItem("userId", JSON.stringify(data.userId));
            window.location = data.url;
          } else {
            history.push("/signin");
          }
        });
    } catch (e) {
      setIsLoading(false);
      alert.error(e.message);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Register to QuikSession</title>
      </Head>
      <h1>WELCOME TO QUIKSESSION</h1>
      <p className={styles.p30}></p>

      <div className={styles.formWrapper}>
        <form onSubmit={submitRegister} className={styles.signUpForm}>
          <div className={styles.imgWrapper}>
            <img className={styles.backImg} src='/assets/imgs/formBG1.jpg' alt='signUpForm' />
            <div className={styles.contentWrapper}>
              <div className={'row' + " " + styles.inputrowpadding}>
                <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                  <AccountCircle />
                  <input
                    className={styles.inputwidth}
                    placeholder='First Name'
                    name='first_name'
                    type='text'
                    value={signUpInfo.firstName}
                    onChange={(event) => {
                      console.log({ ...signUpInfo, firstName: event.target.value });
                      setSignUpInfo({ ...signUpInfo, firstName: event.target.value })
                    }}
                    required
                  >
                  </input>
                  <img className={styles.iconstyle} src='/assets/logo.png' alt='signUpForm' />
                </div>
              </div>
              <div className={'row' + " " + styles.inputrowpadding}>
                <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                  <AccountCircle />
                  <input
                    className={styles.inputwidth}
                    placeholder='Last Name'
                    name='last_name'
                    type='text'
                    value={signUpInfo.lastName}
                    onChange={(event) => {
                      console.log({ ...signUpInfo, lastName: event.target.value });
                      setSignUpInfo({ ...signUpInfo, lastName: event.target.value })
                    }}
                    required
                  >
                  </input>
                </div>
              </div>
              <div className={'row' + " " + styles.inputrowpadding}>
                <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                  <AccountCircle />
                  <input
                    className={styles.inputwidth}
                    placeholder='Personal Email'
                    name='email'
                    type='email'
                    isInvalid={isInvalid.email}
                    value={signUpInfo.email}
                    onChange={(event) => {
                      console.log({ ...signUpInfo, email: event.target.value });
                      setSignUpInfo({ ...signUpInfo, email: event.target.value })
                    }}
                    required
                  >
                  </input>
                </div>
              </div>
              <div className={'row' + " " + styles.inputrowpadding}>
                <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                  <AccountCircle />
                  <input
                    className={styles.inputwidth}
                    placeholder='Confirm Email'
                    name='confirmEmail'
                    type='email'
                    value={signUpInfo.confirmEmail}
                    onChange={(event) => {
                      console.log({ ...signUpInfo, confirmEmail: event.target.value });
                      setSignUpInfo({ ...signUpInfo, confirmEmail: event.target.value })
                    }}
                    required
                  >
                  </input>
                </div>
              </div>
              <div className={'row' + " " + styles.inputrowpadding}>
                <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                  <LockIcon />
                  <input
                    className={styles.inputwidth}
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={signUpInfo.password}
                    onChange={(event) => {
                      console.log({ ...signUpInfo, password: event.target.value });
                      setSignUpInfo({ ...signUpInfo, password: event.target.value })
                    }}
                    required
                  />
                  <span className={styles.VisibilityIconview}>
                    <VisibilityIcon />
                  </span>
                </div>
              </div>
              <div className={'row' + " " + styles.inputrowpadding}>
                <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                  <LockIcon />
                  <input
                    className={styles.inputwidth}
                    placeholder='Confirm Password'
                    name='confirmPass'
                    type='password'
                    value={signUpInfo.confirmPass}
                    onChange={(event) => {
                      console.log({ ...signUpInfo, confirmPass: event.target.value });
                      setSignUpInfo({ ...signUpInfo, confirmPass: event.target.value })
                    }}
                    required
                  />
                  <span className={styles.VisibilityIconview}>
                    <VisibilityIcon />
                  </span>
                </div>
              </div>

              <div className={'row' + " " + styles.inputrowpadding}>
                <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                  <div className='row'>

                    <label className={styles.labelstyle}>
                      Add Profile Image
                  </label>
                    <FormAddImage isSmallSize={false} activeImage={activeImage} setActiveImage={setActiveImage} />
                  </div>
                </div>
              </div>

              <div className={'row' + " " + styles.inputrowpadding}>
                <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                  <label className={styles.inputrowpadding + " " + styles.labelsocials}>
                    Connect socials
                  </label>
                </div>
              </div>

              <div className={'row' + " " + styles.inputrowpadding}>
                <div className='col-sm-3	col-md-3	col-lg-3	col-xl-3'>
                  <img src='/assets/imgs/icons/instagram.png' className={styles.socialIcon} />
                </div>
                <div className='col-sm-3	col-md-3	col-lg-3	col-xl-3'>
                  <img src='/assets/imgs/icons/linkedin.png' className={styles.socialIcon} />
                </div>
                <div className='col-sm-3	col-md-3	col-lg-3	col-xl-3'>
                  <img src='/assets/imgs/icons/twitter.png' className={styles.socialIcon} />
                </div>
                <div className='col-sm-3	col-md-3	col-lg-3	col-xl-3'>
                  <Button className={styles.signupbtn} as="input" type="submit" value="Sign up" />
                </div>
              </div>
              {/* <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormInputComponent
                    placeholder='Personal Email'
                    name='email'
                    type='email'
                    isInvalid={isInvalid.email}
                    value={signUpInfo.email}
                    handleChange={(event) => handleEmailChange(event)}
                    required
                  />
                  <FormInputComponent
                    placeholder='Confirm Email'
                    name='confirmEmail'
                    type='email'
                    value={signUpInfo.confirmEmail}
                    handleChange={(event) => setSignUpInfo({ ...signUpInfo, confirmEmail: event.target.value })}
                    required
                  />
                </Grid>

              </Grid> */}
              {/* <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormInputComponent
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={signUpInfo.password}
                    handleChange={(event) => setSignUpInfo({ ...signUpInfo, password: event.target.value })}
                    required
                  />
                </Grid>

              </Grid>
              <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                  <FormInputComponent
                    placeholder='Confirm Password'
                    name='confirmPass'
                    type='password'
                    value={signUpInfo.confirmPass}
                    handleChange={(event) => setSignUpInfo({ ...signUpInfo, confirmPass: event.target.value })}
                    required
                  />
                </Grid>
              </Grid> */}
              {/* <Grid item xs={12} md={4}>
                <FormAddImage isSmallSize={false} activeImage={activeImage} setActiveImage={setActiveImage} />
              </Grid> */}
              {/* <Grid container justify='center' spacing={2}>
                <Grid item xs={12} md={6}>
                  <RadioGroup
                    className={styles.aroundAlign}
                    aria-label="role"
                    name="role"
                    row
                    value={role}
                    onChange={(e) => {
                      setRole(e.currentTarget.value);
                    }}
                  >
                    <FormControlLabel                              
                      value="owner"
                      control={<Radio />}
                      label={<h4>Owner</h4>}
                    />
                    <FormControlLabel                      
                      value="artist"
                      control={<Radio />}
                      label={<h4>Artist</h4>}
                    />
                  </RadioGroup>
                </Grid>
              </Grid> */}
              {/* <Grid container alignItems='center' spacing={2}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={4} className={styles.centerAlign}>
                      <img src='/assets/imgs/icons/instagram.png' className={styles.socialIcon} />
                      <div className={styles.socialBottom}></div>
                    </Grid>
                    <Grid item xs={4} className={styles.centerAlign}>
                      <img src='/assets/imgs/icons/linkedin.png' className={styles.socialIcon} />
                      <div className={styles.socialBottom}></div>
                    </Grid>
                    <Grid item xs={4} className={styles.centerAlign}>
                      <img src='/assets/imgs/icons/twitter.png' className={styles.socialIcon} />
                      <div className={styles.socialBottom}></div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormButtonComponent title='Sign Up' type='submit' isLoading={isLoading} />
                </Grid>
              </Grid> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;
