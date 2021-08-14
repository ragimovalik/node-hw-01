const contactsOperations = require("./contacts");

(async function () {
  try {
    const contactAdd = await contactsOperations.addContact(
      "Robert",
      "rob@com.us",
      "(555) 789-2266"
    );
    // console.log(contactAdd);

    const allContacts = await contactsOperations.listContacts();
    console.table(allContacts);

    const contactRemove = await contactsOperations.removeContact("F9EOSL");
    // console.log(contactRemove);

    const contactGetOne = await contactsOperations.getContactById(3);
    // console.log(contactGetOne);
  } catch (error) {
    console.log("Error info: ", error.message);
  }
})();

// contactsOperations.removeContact(5);

// contactsOperations.getContactById(2);

// console.log(contactsOperations.listContacts());
