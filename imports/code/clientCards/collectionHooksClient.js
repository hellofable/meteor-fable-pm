import { CardsClientCollection } from "/imports/api/cardsClient"
import { CardsCollection } from "/imports/api/cards"
import { cardMetaHelpers } from "./cardMetaHelpers"
import { updateEditor } from "../../ui/Script/Cards/Card/Editor/editorHelpers/updateEditor";


CardsClientCollection.before.insert(function (userId, card) {
    card.collapsed = false
    card.collapsedSidebar = true
    card = cardMetaHelpers.getMeta(card)
});

CardsClientCollection.after.update(function (userId, doc, fieldNames, modifier, options) {



    cardMetaHelpers.setMeta(doc)

    const oldCard = this.previous
    const newCard = doc


    if (oldCard.isSection != newCard.isSection || oldCard.sectionDepth != newCard.sectionDepth) {
        console.log("set all pids");
        cardMetaHelpers.setAllParentIds()
        // cardMetaHelpers.reIndexCards()
    }


}, { fetchPrevious: true });


// watches for changes on the server collection
// and updates the client collection on update or insert
export const createObserver = function (sessionId) {
    return CardsCollection.find().observe({
        changed: function (newCard, oldCard) {
            if (newCard.text == oldCard.text) return;
            const _id = newCard._id;
            if (sessionId != newCard.sessionId) {
                const editor = document.getElementById("pm-" + _id).instance;
                updateEditor(newCard.text, editor);
                cardMetaHelpers.setMeta(newCard);
            }
        },
        added: (doc) => {
            insertClientCard(doc);
        },
    })
}


export function insertClientCard(card) {
    CardsClientCollection.insert(card)
}




window.CardsClientCollection = CardsClientCollection