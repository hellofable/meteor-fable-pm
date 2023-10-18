import { CardsCollection } from "/imports/api/cards";
import { colorList } from "./colorList"
import removeMd from "remove-markdown";
import "./collectionHooks.js"

export const cardHelpers = {
    getParentCard: function (childCard) {
        const cards = CardsCollection.find({}).fetch()
        if (childCard.isSection) {
            let filtered = cards.filter(function (el) {
                return ((el.index < childCard.index) && (el.sectionDepth < childCard.sectionDepth) && el.isSection);
            });
            if (filtered.length) {
                return filtered[filtered.length - 1]
            }
        }
        // child card is a card so find the first section above it
        if (!childCard.isSection) {
            let parentCardArr = cards.filter(function (el) {
                return el.index < childCard.index;
            });
            parentCardArr = parentCardArr.reverse()
            for (let card of parentCardArr) {
                if (card.isSection) {
                    return card
                }
            }
            return
        }
    },
    getFirstLine: function (card) {
        let firstLine = card.text.split("\n")[0];
        firstLine = firstLine.replace(/\[\[.*?\]\]/g, "");      // remove all notes
        firstLine = firstLine.replaceAll(/&nbsp;/g, " ");       // fix spaces
        firstLine = removeMd(firstLine);                        // remove markdown
        firstLine = firstLine.replace(/^#*/, "");               // remove section hash
        firstLine = firstLine.replace(/- (NIGHT|DAY)/i, "");    //remove NIGHT/DAY
        firstLine = firstLine.replace(/^\./i, "");
        card.firstLine = firstLine
    },
    getNotes: function (card) {
        let notes = []
        const pattern = /\[\[(.*?)\]\]/g;
        let matches = card.text.match(pattern) || []

        if (!matches.length) {
            card.notes = []
            return
        }

        if (matches.length) {
            matches = matches.map(match => match.replace(/\[\[|\]\]/g, ''));
            const namesArray1 = colorList.map(item => item.name);
            const filteredArray2 = matches.filter(item => !namesArray1.includes(item))
            card.notes = filteredArray2
        }



    },
    getColors: function (card) {
        // Your input text
        const text = card.text;

        // Regular expression to capture text inside double square brackets
        const pattern = /\[\[(.*?)\]\]/g;

        // Use match to capture all the text inside square brackets
        const matches = text.match(pattern) || [];

        // Array of allowed colors (array of objects)

        // Extract the "name" properties from the objects in the colorList
        const allowedColors = colorList.map(item => item.name);



        // Filter and map matches to get only allowed colors
        const extractedColors = matches
            .map(match => match.match(/\[\[(.*?)\]\]/)[1].trim()) // Extract the text inside brackets and trim whitespace
            .filter(color => allowedColors.includes(color));

        const uniqueColors = [...new Set(extractedColors)];


        card.colors = uniqueColors || []

    },


    getSectionInfo: function (card) {
        card.text.startsWith("#") ? card.isSection = true : card.isSection = false
        if (card.isSection) {
            card.sectionDepth = card.text.match(/^#+/g)[0].length
            card.collapsed = false
            card.collapsedSidebar = true
        }
        if (!card.isSection) {
            card.sectionDepth = 0
            card.collapsed = null
        }
        return card
    },
    getAllParentCards: function (childCard, arr) {
        if (!arr) arr = []
        const parentCard = this.getParentCard(childCard)
        if (!parentCard) {
            if (arr.length) return arr
            return null
        }
        arr.push(parentCard._id)
        this.getAllParentCards(parentCard, arr)
        return arr
    },
    setAllParentIds: async function () {
        const cards = CardsCollection.find({}, { sort: { index: 1 } }).fetch()
        cards.forEach(async (card, index) => {
            const arr = this.getAllParentCards(card)
            card.pids = arr
            // console.log(card);

            // update the card, skip collection hook
            const saved = await CardsCollection.direct.update(card._id, {
                $set: { pids: card.pids },
            });


        })
    },
    getSceneInfo(card) {
        const regexPattern = "^INT|^EXT|^\\.";
        const regex = new RegExp(regexPattern);
        const startsWithIntExtPeriod = regex.test(card.text);
        if (startsWithIntExtPeriod) {
            card.isScene = true
        } else {
            card.isScene = false
        }

    },
    insertCardAtPosition(pos) {
        const cards = CardsCollection.find({}).fetch()
        cards.forEach(card => {
            if (card.index >= pos) {
                CardsCollection.update(card._id, {
                    $set: { index: card.index + 1 },
                });
            }
        });
        let newCard = { index: pos, text: "", isSection: false }
        CardsCollection.insert(newCard)
        this.setAllParentIds()
    },
    reIndexCards() {
        const cards = CardsCollection.find({}, { sort: { index: 1 } }).fetch()
        cards.forEach(async (card, index) => {
            // update the card, skip collection hook
            const saved = await CardsCollection.direct.update(card._id, {
                $set: { index }
            });
        })
    },
    removeCard(cardId) {
        CardsCollection.remove(cardId)
    },
    setSceneIndexForAllCards() {

        console.log("set scene index for all cards")

        const cards = CardsCollection.find({}, { sort: { index: 1 } }).fetch()
        cards.forEach(async (card, index) => {

            let cardsBefore = CardsCollection.find({ isScene: true, isSection: false, index: { $lt: index } }, { sort: { index: 1 } }).fetch().length + 1

            // update the card, skip collection hook
            if (!card.isSection && card.isScene) {
                const saved = await CardsCollection.direct.update(card._id, {
                    $set: { sceneIndex: cardsBefore },
                });
            } else {
                const saved = await CardsCollection.direct.update(card._id, {
                    $set: { sceneIndex: null },
                });
            }


        })
    },
    setMeta(card) {
        this.getSectionInfo(card)
        this.getFirstLine(card)
        this.getNotes(card)
        this.getColors(card)
        this.getSceneInfo(card)

    }
}

window.ch = cardHelpers
















// export function setSection(card) {
//     card.text.startsWith("#") ? card.isSection = true : card.isSection = false
//     if (card.isSection) card.sectionDepth = card.text.match(/^#+/g)[0].length
//     if (!card.isSection) card.sectionDepth = 0

//     return card
// }


// export async function setParentIds() {
//     const cards = CardsCollection.find().fetch()
//     cards.forEach(async (card, index) => {
//         let parentCardId = null
//         const parentCard = getParentCard(card)
//         if (parentCard) parentCardId = parentCard._id
//         card.parentCardId = parentCardId
//         updateCard(card)
//     });
// }

// async function updateCard(card) {
//     const saved = await CardsCollection.update(card._id, {
//         $set: card,
//     });
//     return saved
// }


// function getParentCard(childCard) {
//     const cards = CardsCollection.find({}).fetch()
//     if (childCard.isSection) {
//         let filtered = cards.filter(function (el) {
//             return ((el.index < childCard.index) && (el.sectionDepth < childCard.sectionDepth) && el.isSection);
//         });
//         if (filtered.length) {
//             return filtered[filtered.length - 1]
//         }
//     }
//     // child card is a card so find the first section above it
//     if (!childCard.isSection) {
//         let parentCardArr = cards.filter(function (el) {
//             return el.index < childCard.index;
//         });
//         parentCardArr = parentCardArr.reverse()
//         for (let card of parentCardArr) {
//             if (card.isSection) {
//                 return card
//             }
//         }
//         return
//     }
// }

// export function getAllParentCards(childCardId, arr) {
//     if (!arr) arr = []
//     const childCard = cardsDb.getCardById(childCardId)
//     if (!childCard) return
//     const parentCard = this.getParentCard(childCard)
//     if (!parentCard) {
//         if (arr.length) return arr
//         return null
//     }
//     arr.push(parentCard)
//     this.getAllParentCards(parentCard.id, arr)
//     return arr
// }


// window.getParentCard = getParentCard