// const { createItem, listItems, deleteItem, getItem, updateItem } = require('./itemService');


// test('create an item and save', () => {
//     const item = await createItem.call({}, { name: 'test' });

//     expect(item).toBeDefined();
//     expect(item.name).toBe('test');
//     return item.save()
//         .then(() => {
//             expect(item.name).toBe(false);
//         });
// });

// test('find all items', () => {
//     return listItems.call({})
//         .then(items => {
//             expect(items).toBeDefined();
//             expect(items.length).toBe(1);
//             expect(items[0].name).toBe('test');
//         });
// });

// test('find item by id', () => {
//     return getItem.call({}, req.body.id)
//         .then(item => {
//             expect(item).toBeDefined();
//             expect(item.name).toBe('test');
//         });
// });




// test('update an item', () => {
//     const item = new Item({
//         name: 'test'
//     });
//     return item.save()
//         .then(() => {
//             return Item.findOneAndUpdate({ name: 'test' }, { name: 'test2' });
//         })
//         .then((result) => {
//             expect(result.name).toBe('test2');
//         });
// });

// test('delete an item', () => {
//     const item = new Item({
//         name: 'test'
//     });
//     return item.save()
//         .then(() => {
//             return Item.findOne({ name: 'test' });
//         })
//         .then((result) => {
//             return result.remove();
//         })
//         .then(() => {
//             return Item.findOne({ name: 'test' });
//         })
//         .then((result) => {
//             expect(result).toBe(null);
//         });
// });
