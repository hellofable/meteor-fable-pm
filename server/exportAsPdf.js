import { CardsCollection } from "../imports/api/cards"
import fs from 'fs';




import { promisify } from 'util';
import { exec } from 'child_process';

// Promisify the exec function
const execPromise = promisify(exec);


Meteor.methods({
    // 'script.exportAsPdf'(scriptId) {
    'script.exportAsPdf': async function (scriptId) {
        const userId = Meteor.userId();
        if (!Meteor.userId()) return

        const cards = CardsCollection.find({ scriptId }, { sort: { index: 1 } }).fetch()

        let scriptText = ""


        cards.forEach(element => {
            scriptText = scriptText + element.text
        });

        if (!scriptText) return "error"



        //run wrap against the file
        const wrap = "/Users/demianleclair/Devel/meteor-fable-pm/wrap"
        const scriptFile = `/tmp/${scriptId}.txt`
        const pdfFile = `/tmp/${scriptId}.pdf`


        // write the file
        fs.writeFileSync(scriptFile, scriptText);


        // run wrap against the new text file
        const command = `${wrap} pdf ${scriptFile} --out ${pdfFile}`
        const out = await execPromise(command)

        // read the exported pdf file
        const pdf = fs.readFileSync(pdfFile)
        return pdf




    },
})






