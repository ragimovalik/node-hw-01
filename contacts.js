const path = require("path");
const fs = require("fs/promises");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// Gettin all contacts.
async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const allContacts = await JSON.parse(contacts);

    // console.table(allContacts);

    return allContacts;
  } catch (error) {
    console.log(error.message);
  }
}

/* 
Gettin contact by ID. 
@param {string | number} id.
*/
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const requiredContact = contacts.find((item) => item.id === contactId);

    if (!requiredContact) {
      throw new Error("There is no contact with such an ID");
    }

    console.log("Required Contact", requiredContact);

    return requiredContact;
  } catch (error) {
    console.log(error.message);
  }
}

/* 
Delete contact by ID. Updating contacts list. 
@param {string | number} id.
*/
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const idx = contacts.findIndex((item) => item.id === contactId);

    if (idx === -1) {
      throw new Error("There is no contact with such an ID");
    }

    const updatedContacts = contacts.filter((item) => {
      if (item.id === contactId) {
        console.log(`Contact with ID ${contactId} was deleted`);
      }
      return item.id !== contactId;
    });

    const newContacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts)
    );

    return contacts[contactId];
  } catch (error) {
    console.log(error.message);
  }
}

/* 
Adding contact. Updating contacts list. 
@param {string} name.
@param {string} email.
@param {string} phone.
*/

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();

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

    console.log("New Contact successfully added");

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
