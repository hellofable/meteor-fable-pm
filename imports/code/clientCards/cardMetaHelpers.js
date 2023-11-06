import { CardsClientCollection } from "/imports/api/cardsClient"
import { colorList } from "/imports/api/colorList"
import removeMd from "remove-markdown";





export const cardMetaHelpers = {
    getParentCard: function (childCard) {
        const cards = CardsClientCollection.find({}).fetch()
        if (childCard.isSection) {
            // console.log("is section");
            let filtered = cards.filter(function (el) {
                const x = ((el.index < childCard.index) && (el.sectionDepth < childCard.sectionDepth) && el.isSection);
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
            parentCardArr.sort((a, b) => a.index - b.index);

            parentCardArr = parentCardArr.reverse()

            for (let card of parentCardArr) {
                if (card.isSection) {
                    return card
                }
            }
            return
        }
    },
    setMeta: function (card) {
        const newCard = this.getMeta(card)
        CardsClientCollection.direct.update(newCard._id, newCard)

    },
    getMeta: function (card) {
        card = this.isSection(card)
        card = this.getColors(card)
        card = this.getFirstLine(card)
        card = this.getNotes(card)
        card.pids = this.getAllParentCards(card)
        return card
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
        return card

    },
    getFirstLine: function (card) {
        let firstLine = card.text.split("\n")[0];
        firstLine = firstLine.replace(/\[\[.*?\]\]/g, "");      // remove all notes
        firstLine = firstLine.replaceAll(/&nbsp;/g, " ");       // fix spaces
        firstLine = removeMd(firstLine);                        // remove markdown
        firstLine = firstLine.replace(/^#*/, "");               // remove section hash
        firstLine = firstLine.replace(/- (NIGHT|DAY)/i, "");    //remove NIGHT/DAY
        if (firstLine.match(/^\./)) firstLine = firstLine.toUpperCase()
        firstLine = firstLine.replace(/^\./i, "");
        card.firstLine = firstLine

        return card
    },
    getNotes: function (card) {
        let notes = []
        const pattern = /\[\[(.*?)\]\]/g;
        let matches = card.text.match(pattern) || []

        if (!matches.length) {
            card.notes = []
            return card
        }

        if (matches.length) {
            matches = matches.map(match => match.replace(/\[\[|\]\]/g, ''));
            const namesArray1 = colorList.map(item => item.name);
            const filteredArray2 = matches.filter(item => !namesArray1.includes(item))
            card.notes = filteredArray2
        }


        return card
    },
    isSection: function (card) {
        card.text.startsWith("#") ? card.isSection = true : card.isSection = false
        if (card.isSection) {
            card.sectionDepth = card.text.match(/^#+/g)[0].length
        }
        if (!card.isSection) {
            card.sectionDepth = 0
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
        const cards = CardsClientCollection.find({}, { sort: { index: 1 } }).fetch()
        cards.forEach(async (card, index) => {
            const arr = this.getAllParentCards(card)
            card.pids = arr
            // console.log(card);

            // update the card, skip collection hook
            const saved = await CardsClientCollection.direct.update(card._id, {
                $set: { pids: card.pids },
            });


        })
    },
}



window.cm = cardMetaHelpers