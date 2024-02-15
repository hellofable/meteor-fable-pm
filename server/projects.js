import { Meteor } from 'meteor/meteor';
import { ProjectsCollection } from '/imports/api/projects';




Meteor.publish('projects.all', function publishProjectsAll() {
    const projects = ProjectsCollection.find();
    return projects
})

Meteor.publish('projects.one', function publishOneProject(projectId) {
    return ProjectsCollection.find({ _id: projectId });
})



Meteor.startup(async () => {

})

// insert a project from method
async function insertProject(fields, userId) {
    console.log(fields);
    const projectId = await ProjectsCollection.insertAsync({ title: fields.title, synopsis: fields.synopsis, inTrash: fields.inTrash, createdAt: new Date(), userId });
}

Meteor.methods({
    'projects.insert'(fields) {
        const userId = Meteor.userId();
        if (!Meteor.userId()) return
        fields.inTrash = false
        fields.createdAt = new Date()
        insertProject(fields, userId);
    },
})



