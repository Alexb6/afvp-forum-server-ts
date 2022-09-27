import Mailjet from 'node-mailjet';
import env from '../config/env';

const mailjet = Mailjet.apiConnect(
  env.mj_api_key as string,
  env.mj_api_secret as string
);

// const requestMailjet = mailjet.post('send', { version: 'v3.1' }).request({
//   Messages: [
//     {
//       From: {
//         Email: 'mail@alex-tran.com'
//       },
//       To: [
//         {
//           Email: 'alexlaptran@gmail.com'
//         }
//       ],
//       Subject: 'Your email from Alex',
//       HTMLPart:
//         '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!'
//     }
//   ]
// });

const requestMailjet = (
  from: string,
  to: string,
  subject: string,
  html: string
) =>
  mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: from
          },
          To: [
            {
              Email: to
            }
          ],
          Subject: subject,
          HTMLPart: html
        }
      ]
    })
    .catch((err) => {
      console.log(err.statusCode);
    });

export default requestMailjet;
