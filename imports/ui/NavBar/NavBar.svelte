<script>
    export let _currentUser, _state, meta;
    import DarkMode from "./DarkMode.svelte";
    import UserDropdown from "./UserDropdown.svelte";
    import Export from "./Export.svelte";
    import SidebarToggle from "./SidebarToggle.svelte";
    import ToggleView from "./ToggleView.svelte";
    import ScriptsButton from "./ScriptsButton.svelte";
    import ScriptTitle from "./ScriptTitle.svelte";
    import Logo from "./Logo.svelte";
    import { Route, router } from "tinro";
</script>

<div id="navbar" class="d-flex w-100 align-items-center">
    <div class="p-2">
        {#if meta.params.pid}
            <SidebarToggle {_state} />
            <ScriptsButton {_state} />
        {/if}
    </div>

    <div class="flex-grow-1 text-center">
        <ScriptTitle {_state} />{$_state.current?.project?.title}
    </div>
    {#if meta.params.pid}
        <ToggleView {_state} />
        <Export {_state} />
    {/if}
    <UserDropdown {_state} />
</div>
