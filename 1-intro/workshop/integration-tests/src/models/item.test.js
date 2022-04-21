const mongoose = require('mongoose');
const Item = require('./Item');
const { createItem, listItems } = require('../services/itemService.js')
const { it } = require('@jest/globals');

const itemData1 = {
    name: "Mael",
    date: Date.now
}

const itemData2 = {
    name: "Pierre",
    date: Date.now
}

mongoose.connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


it("Create and save item", async () => {
    const savedItem = await createItem(new Item(itemData1))
    const item = await Item.findOne({ name: 'Mael' }).exec()

    // Check in DB
    expect(item instanceof Item).toBe(true)
    // Check return of function
    expect(savedItem instanceof Item).toBe(true)

    // Delete item after checking be done
    await Item.deleteOne({ name: 'Mael' }).exec()
})

test('find all items', async () => {
    // Create items
    await createItem(new Item(itemData1))
    await createItem(new Item(itemData2))

    // Get items
    const items = await listItems()

    // Check items
    expect(items.length).toBe(2)
    expect(items[0] instanceof Item).toBe(true)
    expect(items[1] instanceof Item).toBe(true)
    expect(items[0]['name']).toBe('Mael')
    expect(items[1]['name']).toBe('Pierre')

    // delete items after checking be done
    await Item.deleteOne({ name: 'Mael' }).exec()
    await Item.deleteOne({ name: 'Pierre' }).exec()
});

// CES METHODES N'EXISTE PAS DANS LE SERVICE CE SONT DES TESTS HYPOTHETIQUES (a commenter pour faire passer les tests)
test('delete item', async () => {
    // Create items
    await createItem(new Item(itemData1))
    await createItem(new Item(itemData2))

    // Delete item (don't exist but function with name in parameter)
    await deleteItem('Mael')

    const item = await Item.findOne({ name: 'Mael' }).exec()
    expect(item).toBeNull()
});

test('update item', async () => {
    // Create items
    await createItem(new Item(itemData1))

    // update item (don't exist but function with name in first parameter, update_name in second parameter)
    await update('Mael', 'Mama')

    // get in DB
    const item = await Item.findOne({ name: 'Mama' }).exec()

    // checking
    expect(item instanceof Item).toBe(true)
    expect(item['name']).toBe('Mama')

    // delete items after checking be done
    await Item.deleteOne({ name: 'Mama' }).exec()
});