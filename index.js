const { Command } = require("commander");
const program = new Command();

const contactsOperations = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await contactsOperations.listContacts();
      break;

    case "get":
      await contactsOperations.getContactById(id);
      break;

    case "add":
      await contactsOperations.addContact(name, email, phone);
      break;

    case "remove":
      await contactsOperations.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
