<script>
    export let _state;

    import BrowserOptionSwitch from "./BrowserOptionSwitch.svelte";
    import CollapseButtons from "./CollapseButtons.svelte";

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

<div class="row w-100">
    <div class="col-6">
        {#each options as option, i}
            <div class="flex-item"><BrowserOptionSwitch {_state} {option} /></div>
        {/each}
    </div>
    <div class="col-6">
        <CollapseButtons {_state} />
    </div>
</div>

<style>
    #browser-options {
        position: relative;
    }

    .flex-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two columns with equal width */
        gap: 0; /* Gap between columns */
    }
</style>
