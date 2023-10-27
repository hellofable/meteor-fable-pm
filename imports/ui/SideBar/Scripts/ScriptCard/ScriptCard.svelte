<script>
    export let script, meta, _state;
    import ScriptCardDropdown from "./ScriptCardDropdown.svelte";
    import ScriptCardButtons from "./ScriptCardButtons/ScriptCardButtons.svelte";
    let active = false;

    $: active = $meta.params.sid == script._id;
</script>

<div class:in-trash={script.inTrash} class:active class="script-card d-flex align-items-center rounded">
    <div class="text-center w-100">
        <div class="fw-bold">
            <a href="/project/{script.projectId}/script/{script._id}"> {script.title}</a>
        </div>
    </div>
    <div class="script-card-dropdown">
        {#if !script.inTrash} <ScriptCardDropdown {script} {_state} {meta} />{/if}
        <!-- {#if script.inTrash} <ScriptCardButtons {script} {_state} {meta} />{/if} -->
    </div>
</div>

<style>
    .in-trash {
        background-image: linear-gradient(
            45deg,
            #ff294257 25%,
            #cccccc 25%,
            #cccccc 50%,
            #ff294257 50%,
            #ff294257 75%,
            #cccccc 75%,
            #cccccc 100%
        ) !important;
        background-size: 56.57px 56.57px !important;
    }
    .active {
        border-right: 5px solid rgb(14, 111, 14);
    }
    .script-card {
        height: 100%;
        position: relative;
        background: rgb(243, 242, 242);
    }

    .script-card-dropdown {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 1;
    }

    a {
        text-decoration: none;
        color: rgb(62, 62, 62);
        padding: 30px;
        font-size: 19px;
    }

    a:hover {
        color: #4fc14f;
    }
</style>
