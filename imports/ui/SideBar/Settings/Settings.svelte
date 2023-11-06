<script>
    import SettingsToggle from "./SettingsToggle.svelte";
    import TopTabs from "./TopTabs.svelte";
    import BrowserOptions from "./BrowserOptions/BrowserOptions.svelte";
    import ExportOptions from "./ExportOptions/ExportOptions.svelte";
    export let _state;
</script>

<div class="mx-2">
    {#if $_state.sidebar.browserOptions.showOptions}
        <!-- <TopTabs {_state} /> -->
        <div id="settings" class="px-3 py-2">
            <BrowserOptions {_state} />
            <!-- {#if $_state.sidebar.browserOptions.topTab == "browserOptions"} <BrowserOptions {_state} /> {/if}
            {#if $_state.sidebar.browserOptions.topTab == "exportOptions"} <ExportOptions {_state} /> {/if} -->
        </div>
    {/if}
    <SettingsToggle {_state} />
</div>
