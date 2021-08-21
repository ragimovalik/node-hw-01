const fs = require("fs/promises");

const fileReading = require("../helpers/file-reading");
const contactsPath = require("../helpers/contacts-path");

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

module.exports = removeContact;
