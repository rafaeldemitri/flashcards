var inquirer = require("inquirer");
var fs = require("fs");
var cardData = require("./basicCards.json");
console.log(cardData);
var basic = require("./basic.js");
var cloze = require("./cloze.js");

function basicCard(front,back){
    this.front = front;
    this.back = back;
}

function createCard(){
    inquirer.prompt([{
        type: "input",
        name: "frontSide",
        message: "What would you like to ask?"
    },{
        type: "input",
        name: "backSide",
        message: "What is the answer?"
    }]).then(function(inputs){
        var card = new basicCard(inputs.frontSide,inputs.backSide);
        cardData.push(card);

        var newCardData = JSON.stringify(cardData,null,'\t');
        fs.writeFile('./basicCards.json',newCardData,function(err){
            if(err) throw err;
            console.log("Done");
        })
    })
}

createCard();