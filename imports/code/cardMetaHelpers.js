import { CardsClientCollection } from "/imports/api/cardsClient"

export const cardMetaHelpers = {
    setMeta: function (card) {
        const newCard = this.getMeta(card)

        CardsClientCollection.direct.update(newCard._id, newCard)

    },
    getMeta: function (card) {
        card = this.isSection(card)
        return card
    },
    isSection: function (card) {
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
    }
}