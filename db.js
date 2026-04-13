const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://chrismejia_db_user:TBdW5Ybh6DmcwQYS@cluster0.mojczqw.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function listItems(filter = {}) {
    try {
        await client.connect();
        const db = client.db('appointmentsDB'); 
        const collection = db.collection('Items'); 
        const items = await collection.find(filter).toArray();
        return items;
    } finally {
        await client.close();
    }
}

async function addItem(item) {
    try {
        await client.connect();
        const db = client.db('appointmentsDB');
        const collection = db.collection('Items');
        const result = await collection.insertOne(item);
    } finally {
        await client.close();
    }
}

async function updateItem(name, updatedFields) {
    try {
        await client.connect();
        const db = client.db('appointmentsDB');
        const collection = db.collection('Items');
        const result = await collection.updateOne({ name }, { $set: updatedFields });
    } finally {
        await client.close();
    }
}

async function deleteItem(name) {
    try {
        await client.connect();
        const db = client.db('appointmentsDB');
        const collection = db.collection('Items');
        const result = await collection.deleteOne({ name });
    } finally {
        await client.close();
    }
}

module.exports = {
    listItems,
    addItem,
    updateItem,
    deleteItem
};