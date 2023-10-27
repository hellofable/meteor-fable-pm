<script>
    export let _state, inTrashCount;

    import { onDestroy, onMount } from "svelte";

    function toggleTrash() {
        $_state.sidebar.inTrash = !$_state.sidebar.inTrash;
    }
</script>

<button
    class:d-none={$_state.sidebar.inTrash}
    on:click={toggleTrash}
    data-bs-toggle="popover"
    data-bs-trigger="hover"
    data-bs-content="Open Trash"
    class="btn btn-danger btn-sm trash w-100 open-button rounded-0"
>
    <i class="bi bi-trash3-fill" />
    {#if inTrashCount} ({inTrashCount}) {/if}

    <!-- <span class="open-button-text">Open Trash</span> -->
</button>

<button
    class:d-none={!$_state.sidebar.inTrash}
    on:click={toggleTrash}
    data-bs-toggle="popover2"
    data-bs-trigger="hover"
    data-bs-content="Close Trash"
    class="btn btn-danger btn-sm w-100 close-button rounded-0"
>
    Close Trash
    <!-- <span class="open-button-text">Close Trash</span> -->
</button>
