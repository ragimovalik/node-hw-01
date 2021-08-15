const path = require("path");
const fs = require("fs/promises");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

/* 
Function to reading JSON file. 
@param path
*/
const fileReading = async (path) => {
  const readFile = await fs.readFile(path);
  const parsedFile = await JSON.parse(readFile);
  return parsedFile;
};

// Gettin all contacts.
async function listContacts() {
  try {
    const allContacts = await fileReading(contactsPath);

    console.table(allContacts);

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
    const contacts = await fileReading(contactsPath);

    const requiredContact = contacts.find(
      (item) => item.id.toString() === contactId
    );

    if (!requiredContact) {
      throw new Error("There is no contact with such an ID");
    }

    console.log("Required contact: ", requiredContact);

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
    const contacts = await fileReading(contactsPath);

    const idx = contacts.findIndex((item) => item.id.toString() === contactId);

    if (idx === -1) {
      throw new Error("There is no contact with such ID");
    }

    const updatedContacts = contacts.filter((item) => {
      if (item.id.toString() === contactId) {
        console.log(`Contact with ID ${contactId} was successfully deleted`);
      }
      return item.id.toString() !== contactId;
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
