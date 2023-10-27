import { CardsClientCollection } from "/imports/api/cardsClient"
import { cardMetaHelpers } from "./cardMetaHelpers"

CardsClientCollection.before.insert(function (userId, card) {
    // console.log("client.before.insert");
    card = cardMetaHelpers.getMeta(card)
});

CardsClientCollection.after.update(function (userId, doc, fieldNames, modifier, options) {
    console.log("client.after.update");
    cardMetaHelpers.setMeta(doc)
}, { fetchPrevious: false });