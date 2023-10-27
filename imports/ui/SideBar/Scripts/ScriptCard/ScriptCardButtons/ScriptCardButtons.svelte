<script>
    import DeleteButton from "./DeleteButton.svelte";
    import UntrashButton from "./UntrashButton.svelte";
    export let script, _state, meta;
</script>

<UntrashButton {script} {_state} {meta} />
<DeleteButton {script} {_state} {meta} />
