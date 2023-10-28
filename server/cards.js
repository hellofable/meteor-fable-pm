import { Meteor } from 'meteor/meteor';
import { CardsCollection } from '/imports/api/cards';


export async function insertCard(card, userId) {

    await CardsCollection.insertAsync({ index: card.index, text: card.text || "", createdAt: new Date(), scriptId: card.scriptId, userId });
}

async function updateCard(fields) {
    CardsCollection.update(fields._id, { $set: { html: fields.html, sessionId: fields.sessionId, text: fields.text } });
}

Meteor.publish('cards.script', function publishScriptsAll(scriptId) {
    return CardsCollection.find({ scriptId });
})

Meteor.methods({
    'cards.insert'(fields) {
        const userId = Meteor.userId();
        if (!Meteor.userId()) return
        insertCard(fields, userId);
    },
    'cards.update'(fields) {
        updateCard(fields);
    },
    'cards.getAll'(scriptId) {
        return CardsCollection.find({ scriptId }).fetch()
        // return "This is a value from the server!";
    }
})


