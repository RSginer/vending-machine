"use strict";

const inquirer = require('inquirer');
const products = require('./mock/products')
const vendingMachine = require('./vending-machine')

const prompt = inquirer.createPromptModule();

async function main() {
    console.log("Welcome to the best venging machine in the city :)")
    console.log("Here you have our available products.")
    products.forEach((product) => {
        console.log(`ID:${product.id} - ${product.name} ${product.price}`)
    })
    const moneyQuestion = await prompt({
        name: "moneyAnswer",
        type: "input",
        message: "Please enter coins"
    })

    let money = parseInt(moneyQuestion.moneyAnswer);
    
    let productId;
    
    while(productId === undefined) {
        const productQuestion = await prompt({
            name: "productAnswer",
            type: "input",
            message: "Please enter the product ID"
        })

        const productAnswer = parseInt(productQuestion.productAnswer);

        if (products.find((product) => product.id == productAnswer)) {
            productId = productAnswer;
        } else {
            console.log("Invalid product ID try again")
        }
    }

    const selectedProduct = products.find((product) => product.id == productId);

    if (selectedProduct.price > money) {
        while(selectedProduct.price > money) {
            console.log("Insuficient money, please enter more coins")
            const moneyQuestion = await prompt({
                name: "moneyAnswer",
                type: "input",
                message: "Please enter coins"
            })
        
            money += parseInt(moneyQuestion.moneyAnswer);
        }
    }
    const result = await vendingMachine(products, money, productId);

    console.log(result);
}

main()