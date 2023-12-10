<script>
    export let card, _state, script;
    import { convertTextToHtml } from "./editorHelpers/convertTextToHtml";
    import { getHtmlFromEditor } from "./editorHelpers/getHtmlFromEditor";
    import { convertHtmlToText } from "./editorHelpers/convertHtmlToText";
    import { CardsClientCollection } from "/imports/api/cardsClient";

    let editorEl;
    export let editor;
    import { onMount } from "svelte";
    import { EditorState } from "prosemirror-state";
    import { EditorView } from "prosemirror-view";
    import { Schema, DOMParser, DOMSerializer } from "prosemirror-model";

    import { schema } from "./editorSetup/schema";
    import { addListNodes } from "prosemirror-schema-list";
    import { editorSetup } from "./editorSetup";

    // save the card on key up
    let debounceTimer;
    function onKeyup(editor) {
        // save the card text to the client db
        const html = getHtmlFromEditor(editor);
        const text = convertHtmlToText(html);
        CardsClientCollection.update(card._id, { $set: { text } });

        // save the card to the db
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            console.log("saving card to db... ");
            Meteor.call("cards.update", { _id: card._id, sessionId: $_state.sessionId, text });
        }, 500);
    }

    const mySchema = new Schema({
        nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
        marks: schema.spec.marks,
    });

    onMount(() => {
        // console.log(JSON.stringify(card.text));
        const html = convertTextToHtml(card.text.trim());
        const domNode = document.createElement("div");
        domNode.innerHTML = html;

        // console.log(html);
        // pm.setContent(format.fromHTML(pm.schema, "my html", { preserveWhiteSpace: true }));

        editor = new EditorView(editorEl, {
            state: EditorState.create({
                doc: DOMParser.fromSchema(mySchema).parse(domNode, { preserveWhitespace: true }),
                plugins: editorSetup({ schema: mySchema, menuBar: false }),
            }),
        });
        editorEl.instance = editor;
        // editor.dom.addEventListener("drop", (event) => {
        //     console.log("wjee");
        //     event.preventDefault();
        //     return false;
        // });
        editor.dom.addEventListener("focus", (event) => {
            _state.setKey("current.card._id", card._id);
        });
    });

    onMount(() => {
        // console.log("card created");
    });
</script>

<div
    on:keyup={() => {
        onKeyup(editor);
    }}
    class="h-100"
    id="pm-{card._id}"
    bind:this={editorEl}
/>
