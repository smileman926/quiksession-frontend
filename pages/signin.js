import Head from 'next/head'
import styles from '../styles/Register.module.scss';
import clsx from 'clsx';
import FormInputComponent from '../components/FormControls/FormInputComponent';
import { useState } from 'react';
import { Grid, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import FormButtonComponent from '../components/FormControls/FormButtonComponent';
import FormForget from '../components/FormControls/FormForget';
import { login } from "../services";
import { withRouter } from 'next/router'
import { useRouter } from "next/router";

import { validateEmail } from '../utils/validation';
import { useAlert } from 'react-alert';

import { AccountCircle } from "@material-ui/icons";
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from 'react-bootstrap/Button';

const RegisterPage = () => {
  const router = useRouter();
  const query = router.query

  console.log("----- props", query);
  const alert = useAlert();

  const [role, setRole] = useState(query.role || "artist");

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setIsInvalid({
      ...isInvalid,
      email: false
    });
    setLoginInfo({ ...loginInfo, email: e.target.value });
  }

  const submitLogin = async (e) => {
    if (isLoading)
      return;

    e.preventDefault();

    if (!validateEmail(loginInfo.email)) {
      setIsInvalid({
        ...isInvalid,
        email: true
      });
      return;
    }


    setIsLoading(true);
    try {
      const result = await login(loginInfo);
      setIsLoading(false);
      result?.token && router.push("/")
    } catch (e) {
      setIsLoading(false);
      alert.error(e.message);
    }
  };

  return (
    <div className={styles.container}>

      <Head>
        <title>Sign into QuikSession</title>
      </Head>
      <h1>WELCOME TO QUIKSESSION</h1>
      <p className={styles.p30}></p>

      <div className={styles.formWrapper}>
        <form onSubmit={submitLogin} className={styles.signUpForm}>
          <div className={styles.imgWrapper}>
            <img className={styles.backImg} src='/assets/imgs/formBG1.jpg' alt='signUpForm' />
            <div className='row'>
              <div className={'col-sm-4	col-md-4	col-lg-4	col-xl-4' + " " + styles.btncenter}>
                <div className={'row' + " " + styles.btncentermobview}>
                  {/* <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6'> */}
                  <Button className={styles.signupbtn + " " + styles.btnbgcolor} as="input" type="submit" value="Log In" />
                  {/* </div> */}
                  {/* </div>
                <div className='row'> */}
                  {/* <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6'> */}
                  <Button className={styles.signupbtn + " " + styles.btnbgnone} as="input" type="submit" value="Sign up" />
                  {/* </div> */}
                </div>
              </div>
              <div className='col-sm-8	col-md-8	col-lg-8	col-xl-8'>
                <div className={styles.contentWrapper}>

                  <div className={'row' + " " + styles.loginiconcenter}>
                    <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                      <img className={styles.loginiconstyle} src='/assets/logo.png' alt='signUpForm' />
                    </div>
                  </div>

                  <div className={'row' + " " + styles.signinbtninputrowpadding}>
                    <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                      <AccountCircle />
                      <input
                        className={styles.logininputwidth}
                        placeholder='Email'
                        name='email'
                        type='email'
                        value={loginInfo.email}
                        onChange={(event) => {
                          console.log({ ...loginInfo, email: event.target.value });
                          setLoginInfo({ ...loginInfo, email: event.target.value })
                        }}
                        required
                      >
                      </input>
                    </div>
                  </div>

                  <div className={'row' + " " + styles.signinbtninputrowpadding}>
                    <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                      <LockIcon />
                      <input
                        className={styles.logininputwidth}
                        placeholder='Password'
                        name='password'
                        type='password'
                        value={loginInfo.password}
                        onChange={(event) => {
                          console.log({ ...loginInfo, password: event.target.value });
                          setLoginInfo({ ...loginInfo, password: event.target.value })
                        }}
                        required
                      />
                      <span className={styles.VisibilityIconview}>
                        <VisibilityIcon />
                      </span>
                    </div>
                  </div>
                  <div className={'row' + " " + styles.signinbtninputrowpadding}>
                    <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                      <FormForget />
                    </div>
                  </div>
                  <div className={'row' + " " + styles.inputrowpadding}>
                    <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                      <Button className={styles.signinbtn} as="input" type="submit" value="Log In" />
                      {/* <FormButtonComponent type="submit" isLoading={isLoading} title='Log In' /> */}
                    </div>
                  </div>
                  <div className={'row' + " " + styles.inputrowpadding}>
                    <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                      <img src='/assets/google.png' alt='google_icon' />
                      <Button className={styles.googlebtn + " " + 'btn'} as="input" isGoogle={true} type="button" value="Sign In with Google" onClickFunc={() => router.push("/auth/google")} />
                      {/* <FormButtonComponent type="button" isGoogle={true} title='Continue with' onClickFunc={() => router.push("/auth/google")} /> */}
                    </div>
                  </div>

                  {/* <Grid container justify='center' spacing={2}>
                <Grid item xs={12} sm={10}>
                  <FormInputComponent
                    placeholder='Email'
                    name='email'
                    type='email'
                    value={loginInfo.email}
                    handleChange={(event) => { handleEmailChange(event) }}
                    isInvalid={isInvalid.email}
                    kind='login'
                    required
                  />
                </Grid>
              </Grid>

              <Grid container justify='center' spacing={2} className={styles.mt30}>
                <Grid item xs={12} sm={10}>
                  <FormInputComponent
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={loginInfo.password}
                    handleChange={(event) => setLoginInfo({ ...loginInfo, password: event.target.value })}
                    isInvalid={isInvalid.password}
                    kind='login'
                    required
                  />
                </Grid>
              </Grid>

              <Grid container justify='center' spacing={2}>
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

                  {/* <Grid container justify='center' spacing={2}>
                <Grid item xs={12} md={11}>
                </Grid>
              </Grid> */}

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default RegisterPage;
