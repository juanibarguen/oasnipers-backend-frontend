import {HOST,PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET} from '../config.js'
import axios from 'axios'


export const createOrder = async (req, res) => {
    try {

      const { price, name } = req.body;

      if (!price || !name) {
        return res.status(400).json({ message: "Price and name are required" });
      }

      const order = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: price,
            },
            description: name,
          },
        ],
        application_context: {
          brand_name: "mycompany.com",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${HOST}/capture-order`,
          cancel_url: `${HOST}/cancel-payment`,
        },
      };
  
      // format the body
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
  
      // Generate an access token
      const {
        data: { access_token },
      } = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
      );
  
      console.log(access_token);
  
      // make a request
      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders`,
        order,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
  
      console.log(response.data);
  
      return res.json(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Something goes wrong");
    }
  };


  export const captureOrder = async (req, res) => {
    const { token } = req.query;
  
    try {
      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
      );
  
      console.log(response.data);
  
      res.redirect("/payed.html");
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  export const cancelOrder = (req, res) => {
    res.redirect('/');
  };