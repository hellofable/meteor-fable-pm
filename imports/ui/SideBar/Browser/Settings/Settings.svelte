<script>
    import SettingsToggle from "./SettingsToggle.svelte";
    import TopTabs from "./TopTabs.svelte";
    import BrowserOptions from "./BrowserOptions/BrowserOptions.svelte";
    export let _state;
</script>

<div class="mx-2">
    {#if $_state.sidebar.browserOptions.showOptions}
        <TopTabs {_state} />
        {#if $_state.sidebar.browserOptions.topTab == "browserOptions"} <BrowserOptions {_state} /> {/if}
    {/if}
    <SettingsToggle {_state} />
</div>
