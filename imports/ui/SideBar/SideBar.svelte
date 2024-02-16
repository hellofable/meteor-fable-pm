<script>
    export let _state;
    import { onMount } from "svelte";
    import TopTabs from "./TopTabs/TopTabs.svelte";
    import Browser from "./Browser/Browser.svelte";
    import Projects from "../Projects/Projects.svelte";

    export let meta;
    let trash;

    onMount(() => {});
</script>

<sidebar class:d-none={$_state.sidebar.show} class="d-flex flex-column">
    <TopTabs {_state} />

    {#if $_state.sidebar.selected == "browser"}
        <Browser {_state} {meta} />
    {/if}

    {#if $_state.sidebar.selected == "projects"}
        <Projects {_state} />
    {/if}
</sidebar>

<style>
    sidebar {
        /* border: 5px solid yellow; */
        height: 100vh;
        overflow: hidden;
        flex: 0 0 350px;
    }
</style>
