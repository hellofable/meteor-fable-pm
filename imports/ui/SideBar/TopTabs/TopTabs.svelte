<script>
    export let _state;
    export let meta;
</script>

<div class=" top-tabs px-2 mt-2 d-flex mb-2">
    <button
        on:click={() => {
            $_state.sidebar.selected = "Browser";
        }}
        class:btn-primary={$_state.sidebar.selected == "Browser"}
        class:btn-light={$_state.sidebar.selected != "Browser"}
        class="btn me-2 px-3">Browser</button
    >

    <button
        class:op={$_state.sidebar.selected == "Projects"}
        disabled={$_state.sidebar.selected == "Projects"}
        on:click={() => {
            $_state.sidebar.showOptions = !$_state.sidebar.showOptions;
        }}
        on:click={null}
        class="btn btn-light flex-grow-1"
    >
        <i class="bi bi-sliders2" /></button
    >
</div>

<style>
    .d-hidden {
        opacity: 0;
    }

    .op {
        opacity: 0.3;
    }
</style>
