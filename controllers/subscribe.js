const fetch = require("node-fetch");
// import addUsertoLists from "../helpers/newsletters";
// exports.newsLetter = async (req, res) => {
//   try {
//     // User email from the Body
//     const { email } = req.body;
//     // this function add new subscriber to mailchimp
//     const userAdded = await addUsertoLists(email);
//     // check if the subscriber was added sucessfully to return a sucess message
//     if (userAdded) return res.status(200).json({ success: "You Successfully Subscribed" });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

exports.newsletter = async (req, res) => {
  const { email } = req.body;

  // Make sure fields are filled
  if (!email) {
    res.status(404);
    return;
  }

  // Construct req data
  const data = await {
    members: [
      {
        email_address: email,
        status: "subscribed"

      }
    ]
  };

  const postData = JSON.stringify(data);

  fetch("https://us1.api.mailchimp.com/3.0/lists/fd7fc5a87c", {
    method: "POST",
    headers: {
      Authorization: "auth 1c77e1708e5fe5c82303856c4944d496-us1"
    },
    body: postData
  })
    .then(res.statusCode === 200
      ? res.status(200)
      : res.status(404))
    .catch(err => console.log(err));
};
