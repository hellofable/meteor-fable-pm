import { CardsCollection } from "../imports/api/cards"
import fs from 'fs';




import { promisify } from 'util';
import { exec } from 'child_process';

// Promisify the exec function
const execPromise = promisify(exec);


Meteor.methods({
    // 'script.exportAsPdf'(scriptId) {
    'script.exportAsPdf': async function (scriptId, settings) {



        const userId = Meteor.userId();
        if (!Meteor.userId()) return

        const cards = CardsCollection.find({ scriptId }, { sort: { index: 1 } }).fetch()

        let scriptText = ""




        cards.forEach(element => {
            let elementText = element.text.trim() + "\n\n"
            scriptText = scriptText + elementText
        });

        if (!scriptText) return "error"



        //run wrap against the file
        const wrap = "/Users/demianleclair/Devel/meteor-fable-pm/wrap"
        const afterwriting = "/Users/demianleclair/.nvm/versions/node/v18.17.1/bin/afterwriting"
        const scriptFile = `/tmp/${scriptId}.txt`
        const pdfFile = `/tmp/${scriptId}.pdf`
        const settingsFile = `/tmp/${scriptId}_settings.json`



        // write the file
        fs.writeFileSync(scriptFile, scriptText);
        fs.writeFileSync(settingsFile, JSON.stringify(settings));



        // run wrap against the new text file
        // const command = `${wrap} pdf ${scriptFile} --out ${pdfFile}`
        const command = `${afterwriting} --source ${scriptFile} --pdf ${pdfFile} --overwrite --config ${settingsFile}`

        // console.log(command)
        // return

        const out = await execPromise(command)

        // read the exported pdf file
        const pdf = fs.readFileSync(pdfFile)
        return pdf




    },
    'script.exportAsText': async function (scriptId) {



        const userId = Meteor.userId();
        if (!Meteor.userId()) return

        const cards = CardsCollection.find({ scriptId }, { sort: { index: 1 } }).fetch()

        let scriptText = ""


        cards.forEach(element => {
            let elementText = element.text.trim() + "\n\n"
            scriptText = scriptText + elementText
        });

        if (!scriptText) return "error"



        // save the file
        const scriptFile = `/tmp/${scriptId}.txt`




        // write the file
        fs.writeFileSync(scriptFile, scriptText);

        // read the exported pdf file
        const txtFile = fs.readFileSync(scriptFile)
        return txtFile




    },
})






