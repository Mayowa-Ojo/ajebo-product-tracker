const cron = require('cron');
const { sendMail } = require('../utils/mail');
const { checkDiff } = require('../utils/check_diff');

// globals
const cronJob = new cron.CronJob('0 */1 * * * *', function() {

   const html = `
      <h3>New Update</h3>
      <p>Hi Mayowa, I found some changes in sneaker sizes since last update. Details below</p>
      
      <table style="width:45em; border:1px solid #333;">
      <tr style="border:1px solid #333;">
         <th style="border:1px solid #333; text-align:center">i</th>
         <th style="border:1px solid #333; text-align:center" colspan="3">storage data</th>
         <th style="border:1px solid #333; text-align:center" colspan="3">live data</th>
      </tr>
      <tr style="border:1px solid #333;">
         <td style="border:1px solid #333;"></td>
         <td style="border:1px solid #333; text-align:center">name</td>
         <td style="border:1px solid #333; text-align:center">sizes</td>
         <td style="border:1px solid #333; text-align:center">product-id</td>
         
         <td style="border:1px solid #333; text-align:center">name</td>
         <td style="border:1px solid #333; text-align:center">sizes</td>
         <td style="border:1px solid #333; text-align:center">product-id</td>
      </tr>
      
      <tr>
         <td style="border:1px solid #333;">1</td>
         <td style="border:1px solid #333; text-align:center;"><div style="width: 10em; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">New Balance MS574VD | Grey Black Blue</div></td>
         <td style="border:1px solid #333; text-align:center; width:6em; color:#dc3545;">[41,42,44]</td>
         <td style="border:1px solid #333; text-align:center">16097</td>
         
         <td style="border:1px solid #333; text-align:center;"><div style="width: 10em; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">New Balance MS574VD | Grey Black Blue</div></td>
         <td style="border:1px solid #333; text-align:center; width:6em; color:#dc3545;">[42,43]</td>
         <td style="border:1px solid #333; text-align:center">16084</td>
      </tr>
      </table>
   `;

   checkDiff().then(res => {
      const message = {
         from: '"Ajebo Tracker[bot]" <mayowaojo.e@gmail.com>',
         to: '"Mayowa Ojo" <ojomayowa.e@gmail.com>',
         subject: 'Notifier: I found changes',
         text: `${JSON.stringify(res)}`,
         html
      };
      // console.log(res.length)
      if(res.length > 0) {
         // send email if check diff function returns changes
         sendMail(message);
         return;
      } return;
   })
   .catch(err => console.error(err));
}, null, true, 'America/Los_Angeles');

cronJob.start();