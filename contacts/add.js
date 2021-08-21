const fs = require("fs/promises");

const { nanoid } = require("nanoid");

const fileReading = require("../helpers/file-reading");
const contactsPath = require("../helpers/contacts-path");

/*
Adding contact. Updating contacts list. 
@param {string} name.
@param {string} email.
@param {string} phone.
*/
async function addContact(name, email, phone) {
  try {
    if (!name || !email || !phone) {
      throw new Error(
        "Please check your data. Name, email, phone are required"
      );
    }

    const contacts = await fileReading(contactsPath);

    contacts.find((item) => {
      if (item.name === name || item.email === email || item.phone === phone) {
        throw new Error("The contact allready in contacts list");
      }
    });

    const newContact = {
      id: nanoid(6),
      name,
      email,
      phone,
    };

    const contactsUpdate = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contactsUpdate));

    console.log("New Contact successfully added: ", newContact);

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = addContact;
