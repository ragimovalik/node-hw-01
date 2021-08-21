const contactsPath = require("../helpers/contacts-path");
const fileReading = require("../helpers/file-reading");

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

module.exports = listContacts;
