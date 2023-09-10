// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')('AC1ad8653402bac8e0b7dc1d6446fcb10d', 'e80ad1219494f4c0f5aea61b546ffb7c');

client.messages
  .create({
     body: 'Here is your article of the day: ',
     from: '+18339460125',
     to: '+18482038411'
   })
  .then(message => console.log(message.sid));