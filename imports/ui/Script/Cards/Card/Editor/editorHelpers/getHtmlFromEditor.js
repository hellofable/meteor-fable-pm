import { DOMSerializer } from "prosemirror-model";

export function getHtmlFromEditor(editor) {

    const schema = editor.state.schema;
    const doc = editor.state.doc;
    const content = DOMSerializer.fromSchema(schema).serializeFragment(doc.content);
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(content);
    const htmlString = tempDiv.innerHTML;
    return htmlString;
}