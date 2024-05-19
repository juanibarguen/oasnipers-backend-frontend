import { config } from "dotenv";
config();

export const PORT = 3000;
export const HOST = 'http:localhost:' + PORT;
 
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET


//DESARROLLO
export const PAYPAL_API = 'https://api-m.sandbox.paypal.com'
//PRODUCCION

//console.log(PAYPAL_API);
//console.log(PAYPAL_API_CLIENT);
//console.log(PAYPAL_API_SECRET);