<script>
    export let _state;
    import { onMount } from "svelte";
    import TopTabs from "./TopTabs/TopTabs.svelte";
    import Browser from "./Browser/Browser.svelte";
    import Scripts from "./Scripts/Scripts.svelte";

    export let meta;
    let trash;

    onMount(() => {});
</script>

<sidebar class="d-flex flex-column">
    <TopTabs {_state} />

    {#if $_state.sidebar.selected == "browser"}
        <Browser {_state} {meta} />
    {/if}

    {#if $_state.sidebar.selected == "scripts"}
        <Scripts {_state} {meta} />
    {/if}
</sidebar>

<style>
    sidebar {
        /* border: 5px solid yellow; */
        height: 100vh;
        overflow: hidden;
    }
</style>
