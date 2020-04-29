import React from "react";
import { Formik, Form, Field } from 'formik';
import Head from 'next/head';
import Router from "next/router";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js"

import SnackbarAlert from "components/Snackbar/SnackbarAlert.js"

import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";

import image from "assets/img/bg7.jpg";

import { useShared } from 'store'

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [general, setGeneral] = useShared('general')

  const [alert, setAlert] = React.useState({state: false, msg: ''});
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setAlert({state: false, msg: ''});
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Head>
        <title>{`${process.env.web_title} - Login`}</title>
      </Head>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validate={values => {
                  const errors = {};
                  if (!values.username) {
                    errors.username = 'Required';
                  }
                  if (!values.password) {
                    errors.password = 'Required';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    if (values.username == 'admin' && values.password == 'admin') {
                      setGeneral({
                        type: 'SET',
                        payload: {
                          state: 'authenticated',
                          data: true
                        }
                      })
                      setGeneral({
                        type: 'SET',
                        payload: {
                          state: 'user',
                          data: { 'nama': 'Admin'}
                        }
                      })
                      Router.push("/dashboard");
                    } else {
                      setAlert({
                        state: true,
                        msg: 'Username/Password Salah'
                      });
                      setSubmitting(false);
                    }
                    // alert(JSON.stringify(values, null, 2));
                  }, 500);
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login Page (u: admin, p: admin)</h4>
                    </CardHeader>
                    <CardBody>
                      <Field
                        component={TextField}
                        name="username"
                        type="text"
                        label="Username"
                        fullWidth={true}
                      />
                      <br />
                      <Field
                        component={TextField}
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        label="Password"
                        name="password"
                        fullWidth={true}
                        InputProps={{
                          endAdornment: 
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            console.log('enteeer');
                            submitForm();
                          }
                        }} 
                      />
                      {isSubmitting && <LinearProgress />}
                      <br />
                      <Button 
                        color="primary" 
                        className="float_right"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Sign In
                      </Button>
                      <br />
                      <br />
                    </CardBody>
                  </Form>
                )}
              </Formik>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
        <SnackbarAlert state={alert.state} msg={alert.msg} severity="error"/>
      </div>
    </div>
  );
}
