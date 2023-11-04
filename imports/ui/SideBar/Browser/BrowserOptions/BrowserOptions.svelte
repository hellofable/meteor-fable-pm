<script>
    export let _state;

    import BrowserOptionSwitch from "./BrowserOptionSwitch.svelte";
    import CollapseButtons from "./CollapseButtons.svelte";

    $: console.log($_state.sidebar.browserOptions);

    const options = [
        {
            name: "firstline",
            label: "Scene Text",
        },
        {
            name: "colors",
            label: "Colors",
        },
        {
            name: "notes",
            label: "Notes",
        },
    ];
</script>

<div class:d-none={!$_state.sidebar.browserOptions.showOptions} id="browser-options" class="p-3 mx-2 pb-3">
    <CollapseButtons {_state} />

    <div class="flex-container">
        {#each options as option, i}
            <div class="flex-item"><BrowserOptionSwitch {_state} {option} /></div>
        {/each}
    </div>
</div>

<style>
    #browser-options {
        border-radius: 3px;
        position: relative;
    }

    .flex-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two columns with equal width */
        gap: 0; /* Gap between columns */
    }
</style>
