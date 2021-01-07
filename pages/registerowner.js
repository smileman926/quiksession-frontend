import Head from 'next/head'
import styles from '../styles/Register.module.scss';
import Link from "next/link";

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
            <h4>WELCOME TO </h4>
            <h3>QUIKSESSION</h3>
            <p className={styles.p30}></p>

            <div className={styles.formWrapper}>
                <form onSubmit={submitRegister} className={styles.signUpForm}>
                    <div className={styles.imgWrapper}>
                        <img className={styles.backImg} src='/assets/imgs/formBG1.jpg' alt='signUpForm' />
                        <div className={'row'}>
                            <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4'>
                                <div className={'row' + " " + styles.ownbtncentermobview}>
                                    <Link href="/signin">
                                        <Button className={styles.signupbtn + " " + styles.btnbgnone} type="submit" value="Log In">Log In</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className={styles.signupbtn + " " + styles.btnbgcolor} type="submit" value="Sign up" >Sign up</Button>
                                    </Link>
                                </div>
                                <div className={'row' + " " + styles.ownerbtncentermobview}>
                                    <Link href="/registerowner">
                                        <Button className={styles.signupbtn + " " + styles.btnbgcolor} type="submit" value="Sign up" >Sign up as Owner</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-sm-8	col-md-8	col-lg-8	col-xl-8'>
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
                                                placeholder='Phone Number'
                                                name='phone_number'
                                                type='number'
                                                value={signUpInfo.firstName}
                                                onChange={(event) => {
                                                    console.log({ ...signUpInfo, firstName: event.target.value });
                                                    setSignUpInfo({ ...signUpInfo, firstName: event.target.value })
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
                                                placeholder='Address'
                                                name='address'
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
                                    <div className={'row' + " " + styles.inputrowpadding + " " + styles.btnstripe}>
                                        <div className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>
                                            <Button className={styles.signupcolor} type="submit" >Continue to Stripe</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default RegisterPage;