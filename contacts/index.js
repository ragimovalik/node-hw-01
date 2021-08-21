const listContacts = require("./get-all");
const getContactById = require("./get-by-id");
const addContact = require("./add");
const removeContact = require("./remove");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
