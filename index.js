const contactsOperations = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const requestedContact = await contactsOperations.getContactById(id);
      console.table(requestedContact);
      break;

    case "add":
      const addedContact = await contactsOperations.addContact(name,email,phone);
      console.table(addedContact);
      break;

    case "remove":
      const deletedContact = await contactsOperations.removeContact(id);
      console.table(deletedContact);
      break;

    default:
      console.warn("Action unknown");
  }
}

invokeAction(argv);