// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// import { Device } from 'twilio-client';
const client = require('twilio')(accountSid, authToken);
// import client from "twilio";
// client(accountSid, authToken);

client.messages
  .create({
     body: 'Here is your article of the day: ',
     from: '+18339460125',
     to: '+17326727245'
   })
  .then(message => console.log(message.sid));