const Item = require('../models/Item.js')

const createItem = (body) => {
    if (!body.name) {
        throw new Error('No name provided in the body');
    }
    const item = new Item({name: body.name});
    return item.save();
}

const listItems = () => {
    return Item.find({});
}

const deleteItem = (name) => {
    return Item.deleteOne({name: name});
}

const updateItem = (name, body) => {
    return Item.updateOne({name: name}, body.updateName);
}

const getItem = (name) => {
    return Item.findOne({name: name});
}

const deleteItems = () => {
    return Item.deleteMany({});
}

module.exports = {
        createItem: createItem,
        listItems: listItems
};