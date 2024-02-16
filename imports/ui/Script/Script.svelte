<script>
    export let meta, _state;
    import { ScriptsCollection } from "../../api/scripts";
    import Cards from "./Cards/Cards.svelte";
    import { onMount, onDestroy } from "svelte";
    import { cardMetaHelpers } from "/imports/code/clientCards/cardMetaHelpers";
    import TextEditor from "./TextEditor/TextEditor.svelte";
    import Editor from "./Editor/Editor.svelte";
    import CodeMirror from "./CodeMirror/CodeMirror.svelte";
    import { windows } from "prosemirror-view/src/browser";

    let script;
    $m: Meteor.subscribe("scripts.one", meta.params.sid);
    $m: {
        script = null;
        setTimeout(() => {
            script = ScriptsCollection.findOne(meta.params.sid);
        }, "200");

        // console.log(script?.title);
        // $_state.current.script = script;
    }

    onMount(() => {});

    $: console.log(script);

    onMount(() => {
        setTimeout(() => {
            console.log("This code needs to be fixed so it runs after all the cards are ready, not a delay.");
            cardMetaHelpers.setAllParentIds();
        }, 1000);
    });

    onDestroy(() => {
        $_state.current.script.title = "";
    });

    window.s = ScriptsCollection;
</script>

{#if script}
    <div class="script">
        <CodeMirror {script} {_state}></CodeMirror>
    </div>
{/if}

<style>
    .script {
        background: #ede7df;

        overflow: hidden;
    }
</style>
