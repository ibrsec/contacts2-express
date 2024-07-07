const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");


//@desc: Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.req_user.user.id });
  res.status(200).json(contacts);
});

//@desc: create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body); //! delete
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  if (!req.req_user.user.id) {
    res.status(400);
    throw new Error("User id is missing!");
  }
  const newContact = await Contact.create({
    user_id: req.req_user.user.id,
    name,
    email,
    phone,
  });
  console.log("new contact = ", newContact);
  res.status(201).json({ message: "Contact is added.", newContact });
});

//@desc: Get one contact
//@route GET /api/contacts/:id
//@access private
const getOneContact = asyncHandler(async (req, res) => {
  let contact = false;
  try {
    contact = await Contact.findById(req.params.id);
  } catch (error) {
    console.log(error.message);
  }
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }


  //? user can get just the owned contact
  if (contact.user_id.toString() !== req.req_user.user.id) {
    res.status(403);
    throw new Error("User dont have permission to get other user's contact!");
  }

  
  console.log("get one contact = ", contact);
  res.status(200).json(contact);
});
//@desc: Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  let contact = false;
  try {
    contact = await Contact.findById(req.params.id);
  } catch (error) {
    console.log(error.message);
  }

  

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  //? user can update just the owned contact
  if (contact.user_id.toString() !== req.req_user.user.id) {
    res.status(403);
    throw new Error(
      "User dont have permission to update other user's contact!"
    );
  }



  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(202).json({ message: "contact is updated.", updatedContact });
});

//@desc: Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  let contact = false;
  try {
    contact = await Contact.findById(req.params.id);
  } catch (error) {
    console.log(error.message);
  }

  

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  //? user can delete just the owned contact
  if (contact.user_id.toString() !== req.req_user.user.id) {
    res.status(403);
    throw new Error(
      "User dont have permission to delete other user's contact!"
    );
  }


  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "contact is deleted.", deletedContact });
});

module.exports = {
  getContacts,
  createContact,
  getOneContact,
  updateContact,
  deleteContact,
};

//*getone,delete,update private yapialcak bitti.
//logger ekle
//servera at,git le cek,
//servera ssh yap

// sonra domaine nasil ataniyor ona bak kisaca yapma ama
//hergun 3 saat kadar proje yapacaz be fe karisik
