<script>
    export let script;
    import autosize from "autosize";
    import { onMount } from "svelte";

    onMount(() => {
        autosize(document.querySelectorAll("textarea"));
    });
</script>

<textarea class="w-100">{script.text}</textarea>

<style>
    textarea {
        background: none;
        border: 0 !important;
        outline: none !important;
        font-family: "Courier New", Courier, monospace;
    }
</style>
