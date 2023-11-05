import { insertCard } from "../cards"


export function splitFountainIntoCards(scriptText) {
    // scriptText = addAtSigns(scriptText)
    const hasCardMarkers = scriptText.match(/\[\[\-\-\-\]\]/g)
    // return splitFountainIntoCardsNoMarkers(scriptText)
    if (!hasCardMarkers) return splitFountainIntoCardsNoMarkers(scriptText)
    if (hasCardMarkers) return splitFountainIntoCardsMarkers(scriptText)
}

function splitFountainIntoCardsMarkers(scriptText) {
    // console.log("split with markers");
    let cards = scriptText.split("[[---]]");
    const cardsOut = []
    cards.forEach(function (cardText, index) {
        if (!cardText) return
        const card = {
            text: cardText,
            // encText: CryptoJS.AES.encrypt(cardText, key).toString()
        }
        cardsOut.push(card);
    })

    cards.pop()
    if (cards[0] == "") cards.shift();
    return cards
}

function splitFountainIntoCardsNoMarkers(scriptText) {
    // console.log("split with NO markers");
    /////////////////////// first split the entire script on new lines
    let scriptArr = scriptText.split(/\r?\n/);
    // itterate over lines
    // creating and pushing cards as needed
    let cards = [];
    let card = "";
    scriptArr.forEach(function (lineText, index) {
        // on match (new card)
        // push existing card text and start new one
        if (lineText.match(/^INT|^\#|^EXT|^\./i) && !lineText.match(/^\.\./i)) {
            cards.push(card);
            card = "";
        }
        card += lineText + "\n";
    });
    cards.push(card);
    // we now have an array of cards containting text for each
    // lets create another array, this time with a json object
    // that containts the text AND encrypted text
    const cardsOut = []
    cards.forEach(function (cardText, index) {

        if (!cardText) return
        const card = {
            text: cardText,
        }
        cardsOut.push(card);
    })
    if (cards[0] == "") cards.shift();

    return cards
}


export function addAtSigns(text) {
    const splitText = text.split("\n");
    let out = [];
    splitText.forEach(function (item, index) {
        let nextLine = null;
        let prevLine = null;
        let currentLine = splitText[index];
        if (splitText[index + 1]) nextLine = splitText[index + 1];
        if (splitText[index - 1]) prevLine = splitText[index - 1];
        const match = currentLine.match(/^[A-Z*_]+[0-9A-Z (._\-')]*[^a-z]/);
        if (match && nextLine) currentLine = "@" + currentLine;
        out.push(currentLine);
    });
    return out.join("\n")
}