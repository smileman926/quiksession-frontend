import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { SERVER_API } from "../constants/urls";
// import { FETCH_USER } from "../actions/types";
import { Context } from "../states/context";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_KEY);
const initialState = { email: "", amount: 50 };

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const { dispatch } = useContext(Context);
  const { onClose, open } = props;
  const [state, setstate] = useState(initialState);
  const handleState = (e) => {
    console.log("handlestate", e.target.name, e.target.value);
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };
  console.log("state", state, open);
  const confirmPayment = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      console.log("stripe is not loaded");
      return;
    }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // Show error to your customer.
      console.log("restule error", result.error.message);
    } else {
      await stripeTokenHandler(result.token);
    }
  };

  const stripeTokenHandler = async (token) => {
    const authStr = await localStorage.getItem("auth");
    const authInstance = JSON.parse(authStr);
    const authToken = authInstance.token.accessToken;
    console.log("auth", authToken, state);
    const resCharge = await axios.post(`${SERVER_API}/stripe`, {
      authToken: authToken,
      chargeToken: token,
      amount: state.amount,
      email: authInstance.user.email,
      isCharge2Artist: false,
    });

    if (resCharge.status === 200) {
      // dispatch({ type: FETCH_USER, payload: resCharge.data });
      const auth_Str = await localStorage.getItem("auth");
      const temp = JSON.parse(auth_Str);
      temp.user.credit = temp.user.credit * 1.0 + state.amount * 1.0;
      localStorage.setItem("auth", JSON.stringify(temp));
      //document.location.reload();
      onClose();
    } else {
      console.log("error", resCharge.data);
    }
    // this.props.handleToken(token);
    // console.log(token);
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Add Credit</DialogTitle>

      <Container>
        <form onSubmit={confirmPayment}>
          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginTop: "20px" }}
          >
            <InputLabel htmlFor="amount">Email</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              label="Email"
              value={props.email}
              defaultValue={props.email}
              variant="outlined"
              error={false}
              readOnly={true}
              onChange={handleState}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <OutlinedInput
              id="amount"
              name="amount"
              value={state.amount}
              defaultValue={state.amount}
              error={false}
              onChange={handleState}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>

          <CardElement />

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            disabled={!stripe}
            onClick={confirmPayment}
            style={{ marginTop: "30px", marginBottom: "20px" }}
          >
            Add Credit
          </Button>
        </form>
      </Container>
    </Dialog>
  );
}

function CheckoutModal(props) {
  const { isOpen, onClose } = props;
  const [email, setEmail] = useState("");
  useEffect(() => {
    const authStr = localStorage.getItem("auth");
    const authInstance = JSON.parse(authStr);
    var email = "";
    if (authInstance) {
      email = authInstance.user.email;
    }
    setEmail(email);
  }, []);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm open={isOpen} onClose={onClose} email={email} />
    </Elements>
  );
}

export default CheckoutModal;
