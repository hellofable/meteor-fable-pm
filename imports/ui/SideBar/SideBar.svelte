<script>
    export let _state;
    import { onMount } from "svelte";
    import Browser from "./Browser/Browser.svelte";
    import Scripts from "./Scripts/Scripts.svelte";

    import TopTabs from "./TopTabs/TopTabs.svelte";
    export let meta;
    let trash;

    onMount(() => {});
</script>

<sidebar class="d-flex flex-column">
    <div class="flex-grow-1">
        <div class="h-100" class:d-none={$_state.sidebar.selected != "Browser"}><Browser {_state} {meta} /></div>
        <div class="h-100" class:d-none={$_state.sidebar.selected != "Projects"}><Scripts {meta} {_state} /></div>
    </div>
</sidebar>

<style>
    sidebar {
        width: 350px;
        background: #f2f2f2;
        height: 100%;
        overflow: hidden;
        flex-shrink: 0;
    }

    .flex-grow-1 {
        /* background: red; */
        /* border: 5px solid yellow; */
        overflow: hidden;
    }
</style>
