// const client = require("@mailchimp/mailchimp_marketing");

// client.setConfig({
//   apiKey: process.env.MAILCHIMP_API,
//   server: process.env.MAILCHIMP_SERVER
// });
// // this function receive listid, email and a status to save on mailchimp
// const addUsertoLists = async (mail) => {
//   const response = await client.lists.addListMember(
//     // the listid is generated when you create an audience in mailchimp
//     process.env.MAILCHIMP_LISTID,
//     {
//       email_address: mail,
//       status: "subscribed"
//     }
//   );
//   return response;
// };

// module.exports = addUsertoLists;
