const createItem = Item => (name,date) => {
    if (!name || !date) {
        throw new Error(`Name: ${name} date: ${date}`);
    }

    const item = new Item({name,date});
    return item.save();
};


const listItems = Item => () => {
    return Item.find({});
}

module.exports = Item => {
    return {
        createItem: createItem(Item),
        listItems: listItems(Item)
    };
};