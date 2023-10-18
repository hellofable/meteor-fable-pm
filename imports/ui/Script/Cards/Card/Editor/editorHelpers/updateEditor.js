
import { DOMParser } from "prosemirror-model";
import { convertTextToHtml } from "./convertTextToHtml"

// gets a pm view instance from the dom and udpates it
export function updateEditor(newText, editor) {


    console.log("updating...")

    const newHtml = convertTextToHtml(newText.trim());
    const editorState = editor.state;
    const schema = editor.state.schema;
    const newDoc = DOMParser.fromSchema(schema).parse(document.createRange().createContextualFragment(newHtml));
    const tr = editorState.tr.replaceWith(0, editorState.doc.nodeSize - 2, newDoc.content);
    editor.updateState(editorState.apply(tr));
}
