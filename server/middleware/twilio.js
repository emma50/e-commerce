import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

async function sendSMS(to, body, next) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const result = await client.messages
      .create({
        body,
        from: '+15624576989',
        to,
      });

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

export default sendSMS;
