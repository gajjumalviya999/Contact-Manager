const asyncHandler = require("express-async-handler");
const Contact = require("./models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const user = req.user;
  const contacts = await Contact.find({ user_id: user.id });
  res.status(200).json(contacts);
});
const createContact = asyncHandler(async (req, res) => {
  const { name, num, email } = req.body;
  const user = req.user;
  if (!name || !num || !email) {
    res.status(400);
    throw new Error("Plase Pass all fields ");
  }
  const newContact = await Contact.create({
    name: name,
    num: num,
    email: email,
    user_id: user.id,
  });
  res
    .status(200)
    .json({ message: " contact created successfully", newContact: newContact });
});
const getContact = asyncHandler(async (req, res) => {
  if (!req?.params?.id) {
    throw new Error("Please provide ID");
  }
  const user = req.user;
  console.log("User123", user);
  const contact = await Contact.findById(req.params.id);
  if(contact && contact.user_id==user.id){
    res.status(200).json(contact);
  }
  else res.send("data NOT FOUND");
});
const updateContact = asyncHandler(async (req, res) => {
  if (!req?.params?.id) {
    throw new Error("Please provide ID");
  }
  const user = req.user;
  if (user) {
    let PrevData = await Contact.findById(req.params.id);
    if (PrevData && PrevData.user_id == user.id) {
      const Updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(Updatedcontact);
    } else {
      throw new Error("You are not allowed to update this contact");
    }
  } else {
    throw new Error("Unauthorized Access");
  }
});
const deleteContact = asyncHandler(async (req, res) => {
  if (!req?.params?.id) {
    throw new Error("Error , ID is required");
  }
  const user = req.user;
  if (user) {
    const contact = await Contact.findById(req.params.id);
    if (contact && contact.user_id == user.id) {
      await Contact.deleteOne(contact);
      res.status(200).json(contact);
    } else {
      throw new Error("You are not allowed to delete this contact");
    }
  } else {
    throw new Error("Unauthorized Access");
  }
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
};
