class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  increaseQuality(item, value) {
    if (item.quality < 50){
    item.quality += value
    if (item.quality > 50)
    {
      item.quality = 50;
    }}
    return item;
  }

  descreaseQuality(item, value){
    if (item.quality != 0){
      item.quality -= value;
    if (item.quality < 0)
    {
      item.quality = 0;
    }
  }
    return item; 
  }

  backstageTicket(item){
    let value;
    if (item.sellIn <= 10 && item.sellIn > 5) {value = 2;}
    else if (item.sellIn <= 5 && item.sellIn > 0) {value = 3;}
    else if (item.sellIn <= 0) {value = -item.quality;}
    else {value = 1;}
    item = this.increaseQuality(item, value);
    return item;
  }

updateQuality(){
  this.items.forEach(item => {
    if (item.name != 'Sulfuras, Hand of Ragnaros'){

    if (item.name == 'Aged Brie') {

        item = this.increaseQuality(item, item.sellIn > 0 ? 1 : 2);
      }
     
     else if ( item.name == 'Backstage passes to a TAFKAL80ETC concert') {

        item = this.backstageTicket(item );
      }

      //pour le moment c'est que les items random qui peuvent être conjured
      else if (item.name.includes('Conjured'))
      {
        item = this.descreaseQuality(item, item.sellIn > 0 ? 2 : 4);
      }
      else{
        item = this.descreaseQuality(item, item.sellIn > 0 ? 1 : 2);
      }
      item.sellIn-=1;
    } 
  });
  return this.items;
}

//   updateItems() {
//     for (let i = 0; i < this.items.length; i++) {
//       if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
//         if (this.items[i].quality > 0) {
//           if (this.items[i].name != '') {
//             this.items[i].quality = this.items[i].quality - 1;
//           }
//         }
//       } else {
//         if (this.items[i].quality < 50) {
//           this.items[i].quality = this.items[i].quality + 1;
//           if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
//             if (this.items[i].sellIn < 11) {
//               if (this.items[i].quality < 50) {
//                 this.items[i].quality = this.items[i].quality + 1;
//               }
//             }
//             if (this.items[i].sellIn < 6) {
//               if (this.items[i].quality < 50) {
//                 this.items[i].quality = this.items[i].quality + 1;
//               }
//             }
//           }
//         }
//       }
//       if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//         this.items[i].sellIn = this.items[i].sellIn - 1;
//       }
//       if (this.items[i].sellIn < 0) {
//         if (this.items[i].name != 'Aged Brie') {
//           if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
//             if (this.items[i].quality > 0) {
//               if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//                 this.items[i].quality = this.items[i].quality - 1;
//               }
//             }
//           } else {
//             this.items[i].quality = this.items[i].quality - this.items[i].quality;
//           }
//         } else {
//           if (this.items[i].quality < 50) {
//             this.items[i].quality = this.items[i].quality + 1;
//           }
//         }
//       }
//     }

//     return this.items;
//   }
// }

module.exports = {
  Item,
  Shop
}
