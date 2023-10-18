import { Meteor } from 'meteor/meteor';
import { ScriptsCollection } from '/imports/api/scripts';






Meteor.publish('scripts.all', function publishScriptsAll() {
    const scripts = ScriptsCollection.find();
    return scripts
})

Meteor.publish('scripts.one', function publishOneScript(scriptId) {
    return ScriptsCollection.find({ _id: scriptId });
})



Meteor.startup(async () => {
    // If the Links collection is empty, add some data.
    if (await ScriptsCollection.find().countAsync() === 0) {
        console.log("inserting script")
        await insertScript({
            title: 'Lost in Translation',
            synopsis: 'Some movie about something.',
        });
    }
})

// insert a script from method
async function insertScript(fields, userId) {
    console.log(fields)
    await ScriptsCollection.insertAsync({ title: fields.title, inTrash: fields.inTrash, createdAt: new Date(), userId });
}

Meteor.methods({
    'scripts.insert'(fields) {

        const userId = Meteor.userId();
        if (!Meteor.userId()) return
        fields.inTrash = false
        fields.createdAt = new Date()
        insertScript(fields, userId);
    },
})


