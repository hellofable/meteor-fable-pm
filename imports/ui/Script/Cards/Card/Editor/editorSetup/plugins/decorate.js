
import { Decoration, DecorationSet } from "prosemirror-view";
import { EditorState, Plugin } from "prosemirror-state";

export const decoratePlugin = new Plugin({
    props: {
        decorations(state) {
            const content = state.doc.content.content

            let pos = {
                start: 1,
                end: null
            }

            const decorations = []
            let lines = []
            content.forEach(function (item, index) {
                pos.end = pos.start + item.nodeSize


                const line = getLineType(item, state, pos, index, lines)
                lines.push(line)


                if (line.decoration) decorations.push(line.decoration)

                pos.start = pos.start + item.nodeSize
                pos.end = pos.start
            });


            return DecorationSet.create(state.doc, decorations);

        },
    },
});

function getLineType(item, state, pos, index, lines) {

    let decoration = null
    let lineType = null
    const exists = true


    const prevLine = lines[index - 1] || { exists: false }
    const firstLineOrPrevEmpty = prevLine.exists == false || !prevLine.lineText
    const lineText = item.textContent

    const match = matchLine(lineText)

    if ((prevLine.lineType == "char" || prevLine.lineType == "dia") && match == "pars") {
        const resolved = state.doc.resolve(pos.start);
        decoration = Decoration.node(resolved.before(), resolved.after(), { class: "pars" });
        lineType = "pars"
        return { lineType, decoration, lineText, exists }
    }


    if (prevLine.lineType == "char" && lineText) {
        const resolved = state.doc.resolve(pos.start);
        decoration = Decoration.node(resolved.before(), resolved.after(), { class: "dia" });
        lineType = "dia"
        return { lineType, decoration, lineText, exists }
    }

    if ((prevLine.lineType == "dia" || prevLine.lineType == "pars") && lineText) {
        const resolved = state.doc.resolve(pos.start);
        decoration = Decoration.node(resolved.before(), resolved.after(), { class: "dia" });
        lineType = "dia"
        return { lineType, decoration, lineText, exists }
    }

    const arr = ["char", "scene", "section", "trans", "center"]
    if (arr.includes(match) & firstLineOrPrevEmpty) {
        const resolved = state.doc.resolve(pos.start);
        decoration = Decoration.node(resolved.before(), resolved.after(), { class: match });
        lineType = match
        return { lineType, decoration, lineText, exists }
    }



    return { lineType, decoration, lineText, exists }
}




export function matchLine(line) {
    if (!line) return null
    if (line.match(/^\>.*\<$/)) return "center";
    if (line.match(/^@/)) return "char";
    if (line.match(/^INT|^EXT|^\./i) && !line.match(/^\.\./i)) return "scene";
    if (line.match(/^>|TO:$/)) return "trans";
    if (line.match(/^\=/i)) return "synopsis";
    if (line.match(/^\(.*\)$/)) return "pars";
    if (line.match(/^\#/)) return "section";
    return null;
}