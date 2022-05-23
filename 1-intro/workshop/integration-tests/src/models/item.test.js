const mongoose = require('mongoose');
const Item = require('./Item');
const { createItem, listItems, deleteItem, getItem } = require('../services/itemService.js')
const { it } = require('@jest/globals');

const itemData1 = {
    name: "Mael",
    date: Date.now
}

const itemData2 = {
    name: "Pierre",
    date: Date.now
}

const itemWrongData = {
    date: Date.now
}

mongoose.connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

Item.deleteMany({ name: 'Mael' }).exec()
Item.deleteMany({ name: 'Pierre' }).exec()
Item.deleteMany({ name: 'Mama' }).exec()

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

test('delete item', async () => {
    // Create items
    await createItem(new Item(itemData1))

    // Delete item
    await deleteItem({ name: 'Mael' })

    const item = await Item.findOne({ name: 'Mael' }).exec()

    expect(item).toBeNull()

    await Item.deleteOne({ name: 'Mael' }).exec()
});

test('create item with wrong body', () => {
    expect(() => {
        createItem(new Item(itemWrongData));
    }).toThrow();
})

test('delete item with wrong body', () => {
    expect(() => {
        deleteItem(new Item(itemWrongData));
    }).toThrow();
})

test('get item', async () => {
    await createItem(new Item(itemData1))

    const item = await getItem({ name: 'Mael' })

    expect(item instanceof Item).toBe(true)
    expect(item['name']).toBe('Mael')

    await Item.deleteOne({ name: 'Mael' }).exec()
})

// METHOD DON'T EXIST IN SERVICE BUT TEST ALREADY CREATE
// test('update item', async () => {
//     // Create items
//     await createItem(new Item(itemData1))

//     // update item (don't exist but function with name in first parameter, update_name in second parameter)
//     await updateItem({ name: 'Mael', updateName: 'Mama' })

//     // get in DB
//     const newItem = await Item.findOne({ name: 'Mama' }).exec()
//     const oldItem = await Item.findOne({ name: 'Mael' }).exec()

//     console.log(await Item.find({}).exec())
//     // checking
//     expect(newItem instanceof Item).toBe(true)
//     expect(newItem['name']).toBe('Mama')
//     expect(oldItem).toBeNull()

//     // delete items after checking be done
//     await Item.deleteOne({ name: 'Mama' }).exec()
// });