import addUsertoLists from "../helpers/newsletters";
exports.newsLetter = async (req, res) => {
  try {
    // User email from the Body
    const { email } = req.body;
    // this function add new subscriber to mailchimp
    const userAdded = await addUsertoLists(email);
    // check if the subscriber was added sucessfully to return a sucess message
    if (userAdded) return res.status(200).json({ sucess: "You Sucessfully Subscribed" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
