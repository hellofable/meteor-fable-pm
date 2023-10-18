import { Meteor } from 'meteor/meteor';
import { CardsCollection } from '/imports/api/cards';


async function insertCard(fields) {
    await CardsCollection.insertAsync({ index: fields.index, text: "", createdAt: new Date(), scriptId: fields.scriptId });
}

async function updateCard(fields) {
    CardsCollection.update(fields._id, { $set: { html: fields.html, sessionId: fields.sessionId, text: fields.text } });
}

Meteor.publish('cards.script', function publishScriptsAll(scriptId) {
    return CardsCollection.find({ scriptId });
})

Meteor.methods({
    'cards.insert'(fields) {
        insertCard(fields);
    },
    'cards.update'(fields) {
        updateCard(fields);
    },
    'cards.getAll'(scriptId) {
        return CardsCollection.find({ scriptId }).fetch()
        // return "This is a value from the server!";
    }
})


