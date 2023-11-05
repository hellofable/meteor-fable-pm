<script>
    export let _state;
    import { onMount } from "svelte";
    import Browser from "./Browser/Browser.svelte";
    import Settings from "./Browser/Settings/Settings.svelte";

    export let meta;
    let trash;

    onMount(() => {});
</script>

<sidebar class="d-flex flex-column">
    <div class="flex-grow-1">
        <Settings {_state} />
        <div class="h-100" class:d-none={$_state.sidebar.selected != "Browser"}><Browser {_state} {meta} /></div>
    </div>
</sidebar>

<style>
    sidebar {
        width: 350px;
        height: 100vh;
        overflow: hidden;
        flex-shrink: 0;
    }

    .flex-grow-1 {
        /* background: red; */
        /* border: 5px solid yellow; */
        overflow: hidden;
    }
</style>
