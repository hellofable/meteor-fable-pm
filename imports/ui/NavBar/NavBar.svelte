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

<Route path="script/:sid/*" let:meta>
    <div id="navbar" class="d-flex w-100 align-items-center">
        <div class="p-2">
            <SidebarToggle {_state} />
            <ScriptsButton {_state} />
        </div>
        <div class="flex-grow-1 text-center">
            <ScriptTitle {_state} />
        </div>
        <ToggleView {_state} />
        <Export {_state} />
        <!-- <DarkMode {_state} /> -->
        <UserDropdown {_state} />
    </div>
</Route>
