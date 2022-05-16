/*
  system comprised of 3 parts:
    1. item creator
      -ensures all required info is present + valid
    2. item manager
      -creates items, updates item info, deletes items,
      queries item info
    3. reports manager
      -generates reports for specific or all items
      -reports for specific items are generated from report objects
      created from the report manager

    components for ITEM:
    SKU code
      -unique identifier for product
      -consists of the first 3 letters of item +
      first 2 letters of category
      -if item name consists of two words, and first word consists
      of two letters only, the next letter is taken from the next word:
      i.e.) an apple = ana

    item name
      -name of item, must consist of min. 5 chars
      -spaces not counted in min. char requirement

    category
      -must consist of min. 5 chars
      -can only be one word, no spaces allowed

    quantity
      -quantity of items
      -must not be blank !!
      -may assume valid number will be provided (no input validification req)

    {
      sku,
      name,
      category,
      quantity
    }
*/
let ItemCreator = (function() {
  function stringWithoutSpaces(string) {
    let result = '';

    for (let idx = 0; idx < string.length; idx += 1) {
      let currentChar = string[idx];
      if (currentChar !== ' ') result += currentChar;
    }

    return result;
  }

  function minimumFiveChars(string) {
    return string.length >= 5;
  }

  function validItemName(itemName) {
    return minimumFiveChars(stringWithoutSpaces(itemName));
  }

  function validCategory(category) {
    return (![].includes.call(category, ' ')) && minimumFiveChars(category);
  }

  function validQuantity(quantity) {
    return Number.isInteger(quantity);
  }

  function generateSKU(itemName, category) {
    let result = '';

    itemName = stringWithoutSpaces(itemName);
    result += itemName.slice(0, 3).toUpperCase();
    result += category.slice(0, 2).toUpperCase();

    return result;
  }

  return function ItemCreator(itemName, category, quantity) {
    if (validItemName(itemName) &&
    validCategory(category) &&
    validQuantity(quantity)) {
      this.itemName = itemName;
      this.category = category;
      this.quantity = quantity;
      this.sku = generateSKU(itemName, category);
    } else {
      return { notValid: true };
    }
  };
})();

let ItemManager = {
  items: [],

  create(itemName, category, quantity) {
    let item = new ItemCreator(itemName, category, quantity);
    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
      return item;
    }
  },

  inventory() {
    return this.items;
  },

  findIndexBySKU(SKUCode) {
    return this.items.findIndex(item => item.sku === SKUCode);
  },

  findItemBySKU(SKUCode) {
    return this.items[this.findIndexBySKU(SKUCode)];
  },

  update(SKUCode, objectWithUpdatedProps) {
    let idxOfItem = this.findIndexBySKU(SKUCode);
    Object.assign(this.items[idxOfItem], objectWithUpdatedProps);
  },

  delete(SKUCode) {
    let idx = this.findIndexBySKU(SKUCode);
    this.items.splice(idx, 1);
  },

  inStock() {
    let itemsInStock = this.items
      .filter(item => item.quantity > 0)
      .map(item => item.itemName);

    console.log(itemsInStock.toString());
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  }
};

let ReportManager = (function() {
  let items;
  let reportItem;

  return {
    init(itemManager) {
      items = itemManager;
    },

    reportInStock() {
      return items.inventory();
    },

    createReporter(SKUCode) {
      reportItem = items.findItemBySKU(SKUCode);

      return {
        itemInfo() {
          Object.keys(reportItem).forEach(key => {
            console.log(`${key}: ${reportItem[key]}`);
          });
        }
      };
    },
  };
})();

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item
// returns list with the 4 valid items
console.log(ItemManager.items);

ReportManager.init(ItemManager);
// logs soccer ball,football,kitchen pot
ReportManager.reportInStock();

ItemManager.update('SOCSP', { quantity: 0 });
// returns list with the item objects for football and kitchen pot
ItemManager.inStock();
// football,kitchen pot
ReportManager.reportInStock();

// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.itemsInCategory('sports');

ItemManager.delete('SOCSP');
// returns list the remaining 3 valid items (without soccer ball)
console.log(ItemManager.items);

let kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10