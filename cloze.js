var inquirer = require("inquirer");
var fs = require("fs");

var cardData = require('./clozeCards.json');

function clozeCard(fullText, answer){
    var clozePositions = clozeDelete(fullText,answer);

    this.partial = getPartial(fullText,clozePositions);

    this.answer = answer;

    function clozeDelete(fullText, answer){
        var start = fullText.indexOf(answer);
        if(start !== -1){
            return [start, start+answer.length];
        }
        throw new Error("Could not find answer");
    }

    function getPartial(fullText,clozePositions){
        var start = fullText.slice(0,clozePositions[1],fullText.length);
        var end = fullText.slice(clozePositions[1],fullText.length);
        return start + " ... " + end;
    }
}

clozeCard.prototype.displayCard = function displayCard(){
    console.log(this.partial.replace("...",this.answer));
}

function createCard(){
    inquirer.prompt([{
        type: "input",
        name: "fullText",
        message: "What is the full text of the card you would you like to make?"
    },{
        type: "input",
        name: "answer",
        message: "What is the answer to the card?"
    }]).then(function(inputs){
        var card = new clozeCard(inputs.fullText,inputs.answer);
        
        card.displayCard();
        
         cardData.push(card);

         var newCardData = JSON.stringify(cardData,null,'\t');
         fs.writeFile('./clozeCards.json',newCardData,function(err){
            if(err) throw err;
            console.log("Done");
        })
    })
}

createCard();