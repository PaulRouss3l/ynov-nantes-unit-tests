const Item = require('../models/Item.js')

const createItem = (body) => {
    if (!body.name) {
        throw new Error('No name provided in the body');
    }
    const item = new Item({ name: body.name });
    return item.save();
}

const listItems = () => {
    return Item.find({});
}

const deleteItem = (body) => {
    if (!body.name) {
        throw new Error('No name provided in the body');
    }

    return Item.deleteOne({ name: body.name });
}

const getItem = (body) => {
    return Item.findOne({ name: body.name });
}

module.exports = {
    createItem: createItem,
    listItems: listItems,
    deleteItem: deleteItem,
    getItem: getItem
};