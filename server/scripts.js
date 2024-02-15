import { Meteor } from 'meteor/meteor';
import { ScriptsCollection } from '/imports/api/scripts';

import { splitFountainIntoCards } from './code/splitFountainIntoCards';
import { insertCard } from './cards';




Meteor.publish('scripts.all', function publishScriptsAll() {
    const scripts = ScriptsCollection.find();
    return scripts
})

Meteor.publish('scripts.one', function publishOneScript(scriptId) {
    return ScriptsCollection.find({ _id: scriptId });
})

Meteor.publish('scripts.project', function publishOneScript(projectId) {
    return ScriptsCollection.find({ projectId });
})


Meteor.startup(async () => {
    // If the Links collection is empty, add some data.
    // if (await ScriptsCollection.find().countAsync() === 0) {
    //     console.log("inserting script")
    //     await insertScript({
    //         title: 'Lost in Translation',
    //         synopsis: 'Some movie about something.',
    //     });
    // }
})

// insert a script from method
async function insertScript(fields, userId) {
    const scriptId = await ScriptsCollection.insertAsync({ projectId: fields.projectId, title: fields.title, inTrash: fields.inTrash, createdAt: new Date(), userId });

    if (fields.text) addCardsOnImport(fields, userId, scriptId)


}

Meteor.methods({
    'scripts.insert'(fields) {
        console.log(fields);
        const userId = Meteor.userId();
        if (!Meteor.userId()) return
        fields.inTrash = false
        fields.createdAt = new Date()
        insertScript(fields, userId);
    },
})



async function addCardsOnImport(fields, userId, scriptId) {

    const cards = splitFountainIntoCards(fields.text)

    let index = 0; // Initialize the index variable

    cards.forEach(card => {
        insertCard({ index, text: card, createdAt: new Date(), scriptId, index }, userId)
        index++;

    });
}