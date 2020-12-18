"use strict";

const coins = [500, 200, 100, 50, 20, 10];


function vendingMachine (products, money, productId) {
    const selectedProduct = products.find((product) => product.id === productId);

    let changeAmount = money - selectedProduct.price;
    let changeValue = 0;
    const change = [];

    while(changeAmount > 0) {
        coins.forEach((coin) => {
            if (changeAmount - coin >= 0) {
                changeValue += coin;
                changeAmount -= coin;
                change.push(coin)
            }
        })
    }

    return {
        product: selectedProduct.name,
        change: change
    }
}

module.exports = vendingMachine;