
import { Decoration, DecorationSet } from "prosemirror-view";
import { Plugin, TextSelection } from "prosemirror-state";


const modifiers = /^\@|^#+|^=|^\./ig
const notes = /\[\[([^[]+)\]\]/ig








function lint(doc) {
    let result = [], lastHeadLevel = null
    function record(msg, from, to, fix) {
        result.push({ msg, from, to, fix })
    }
    // For each node in the document
    doc.descendants((node, pos) => {
        if (node.isText) {
            // Scan text nodes for suspicious patterns
            let m

            while (m = modifiers.exec(node.text)) {
                record(`Modifier`, pos + m.index, pos + m.index + m[0].length)
            }

            while (m = notes.exec(node.text)) {
                record(`Note`, pos + m.index, pos + m.index + m[0].length)
            }


        }
    })
    return result
}



function lintDeco(doc) {
    let decos = []
    lint(doc).forEach(prob => {
        if (prob.msg == "Modifier") decos.push(Decoration.inline(prob.from, prob.to, { class: "modifier" }))
        if (prob.msg == "Note") decos.push(Decoration.inline(prob.from, prob.to, { class: "note red" }))
    })
    return DecorationSet.create(doc, decos)
}



export const marksPlugin = new Plugin({
    state: {
        init(_, { doc }) { return lintDeco(doc) },
        apply(tr, old) { return tr.docChanged ? lintDeco(tr.doc) : old }
    },
    props: {
        decorations(state) { return this.getState(state) },
    }
})