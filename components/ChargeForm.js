import React, { useState, useContext } from "react";
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
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
// import { blue } from "@material-ui/core/colors";
import { SERVER_API } from "../constants/urls";
import { FETCH_USER } from "../actions/types";
import { Context } from "../context";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_KEY);

const initialState = { email: "", amount: 50, isPaid: false };
// const useStyles = makeStyles({
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600],
//   },
// });

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const userContext = useContext(Context);
  // const classes = useStyles();
  let { onClose, onPay } = props;
  const [state, setstate] = useState(initialState);
  const handleState = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

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
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      await stripeTokenHandler(result.token);
    }
  };

  const stripeTokenHandler = async (token) => {
    const authStr = await localStorage.getItem("auth");
    const authInstance = JSON.parse(authStr);
    const authToken = authInstance.token.accessToken;
    const ownerEmail = authInstance.user.email;
    const resCharge = await axios.post(`${SERVER_API}/stripe`, {
      authToken: authToken,
      ownerEmail: ownerEmail,
      chargeToken: token,
      amount: state.amount,
      email: state.email,
      isCharge2Artist: true,
    });

    if (resCharge.status === 200) {
      if (userContext)
        userContext.userDispatch({ type: FETCH_USER, payload: resCharge.data });
      var cData = resCharge.data;
      if (cData.status === "error") onPay(null);
      else {
        onPay(cData.chargeData._id);
        state.isPaid = true;
        console.log(state);
      }
      onClose();
    } else {
      console.log("error", resCharge.data);
    }

    // this.props.handleToken(token);
    // console.log(token);
  };

  return (
    <Container>
      <form onSubmit={confirmPayment}>
        <FormControl fullWidth variant="outlined" style={{ marginTop: "20px" }}>
          <InputLabel htmlFor="amount">Email</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            label="Email"
            value={state.email}
            defaultValue={state.email}
            variant="outlined"
            error={false}
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
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>

        <CardElement />

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={!stripe || state.isPaid}
          onClick={confirmPayment}
          style={{ marginTop: "30px", marginBottom: "20px" }}
        >
          Add Credit
        </Button>
      </form>
    </Container>
  );
}

function ChargeForm(props) {
  const { isOpen, onClose, onPay } = props;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm open={isOpen} onClose={onClose} onPay={onPay} />
    </Elements>
  );
}

export default ChargeForm;
