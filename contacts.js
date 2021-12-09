const path = require('path');
const fs = require('fs').promises;
const {v4} = require("uuid");

const contactsPath = path.join(__dirname,'./db/contacts.json') ;


async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const list = JSON.parse(data);
    return list;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
    try {
        const collection = await listContacts();
        return collection.find(({ id }) => id === contactId);
    } catch (error) {
        console.log (error.message)
     }
    }

async function removeContact(contactId) {
        try {
            const collection = await listContacts();
            const changedCollection = collection.filter(({ id }) => id !== contactId);
      updateSourceFile(changedCollection);
      return collection.filter(({ id }) => id === contactId); //returns  the object excluded

        } catch (error) {
          console.log(error);
    }
}

async function addContact(name, email, phone) {
  try {
      const newRecord = { 'id': v4(), 'name': name, 'email': email, 'phone': phone };
      const collection = await listContacts();
      const changedCollection = [...collection, newRecord ];
      updateSourceFile(changedCollection);
      return newRecord; //returns  the object added
    } catch (error) {
      console.log(error);
    }
  }
async function updateSourceFile(instance) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (error) {
    console.log(error);
  }
}
  
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateSourceFile,
};

