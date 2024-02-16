import { Meteor } from 'meteor/meteor';
import { ScriptsCollection } from '/imports/api/scripts';

import { splitFountainIntoCards } from './code/splitFountainIntoCards';
import { insertCard } from './cards';




Meteor.publish('scripts.all', function publishScriptsAll() {
    const scripts = ScriptsCollection.find();
    return scripts
})

Meteor.publish('scripts.one', function publishOneScript(scriptId) {
    const script = ScriptsCollection.find({ _id: scriptId });

    return script
})

Meteor.publish('scripts.project', function publishOneScript(projectId) {
    return ScriptsCollection.find({ projectId });
})



// insert a script from method
async function insertScript(fields, userId) {
    if (!fields.text) fields.text = " "
    const scriptId = await ScriptsCollection.insertAsync({ text: fields.text, projectId: fields.projectId, title: fields.title, inTrash: fields.inTrash, createdAt: new Date(), userId });
}

Meteor.methods({
    'scripts.insert'(fields) {
        const userId = Meteor.userId();
        if (!Meteor.userId()) return
        fields.inTrash = false
        fields.createdAt = new Date()
        insertScript(fields, userId);
    },
    'script.update'(fields) {
        updateScript(fields);
    },
})




async function updateScript(fields) {

    ScriptsCollection.update(fields._id, { $set: { text: fields.text, sessionId: fields.sessionId } });
}
