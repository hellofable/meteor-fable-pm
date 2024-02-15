<script>
    export let _state;
    import { onMount } from "svelte";
    import TopTabs from "./Settings/TopTabs.svelte";
    import Browser from "./Browser/Browser.svelte";
    import Settings from "./Settings/Settings.svelte";

    export let meta;
    let trash;

    onMount(() => {});
</script>

<sidebar class="d-flex flex-column">
    <TopTabs />
    <Settings {_state} />
    <div id="b" class="flex-grow-1">
        <Browser {_state} {meta} />
    </div>
</sidebar>

<style>
    #b {
        /* border: 5px solid green; */
        height: 400px;
    }
    sidebar {
        /* border: 5px solid yellow; */
        height: 100vh;
        overflow: hidden;
    }
</style>
