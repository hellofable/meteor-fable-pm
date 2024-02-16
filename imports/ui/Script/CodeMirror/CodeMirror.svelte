<script>
    import { EditorState } from "@codemirror/state";
    import { EditorView, keymap, lineNumbers } from "@codemirror/view";
    import { markdown, markdownKeymap } from "@codemirror/lang-markdown";
    import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
    import {
        defaultHighlightStyle,
        syntaxHighlighting,
        foldGutter,
        foldAll,
        foldCode,
        foldEffect,
    } from "@codemirror/language";

    export let script, _state;
    import { onMount } from "svelte";
    import { showMinimap } from "@replit/codemirror-minimap";
    const doc = script.text;
    const extensions = [
        markdown(),
        history(),
        syntaxHighlighting(defaultHighlightStyle),
        keymap.of([defaultKeymap, markdownKeymap, historyKeymap]),
        EditorView.lineWrapping,
        lineNumbers(),
        foldGutter(),
        showMinimap.compute(["doc"], (state) => {
            return {
                create,
                /* optional */
                displayText: "blocks",
                showOverlay: "always",
                gutters: [{ 1: "#00FF00", 2: "#00FF00" }],
            };
        }),
    ];

    let create = (EditorView) => {
        const dom = document.createElement("div");
        return { dom };
    };

    const state = EditorState.create({ doc, extensions });
    const view = new EditorView({ state });

    function getText() {
        return view.state.doc.toString();
    }

    onMount(() => {
        document.querySelector("#editor").append(view.dom);
    });

    let debounceTimer;
    function onKeyup() {
        script.text = getText();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            console.log("saving card to db... ");
            Meteor.call("script.update", { _id: script._id, sessionId: $_state.sessionId, text: script.text });
        }, 500);
        console.log(view.state);
    }

    function foldAllEditor() {
        // foldAll(view);
        view.dispatch({
            effects: foldEffect.of({ from: 1, to: 124 }),
        });
    }
</script>

<!-- <button on:click={foldAllEditor}>Click</button> -->
<div
    on:keyup={() => {
        onKeyup(editor);
    }}
    id="editor"
></div>
