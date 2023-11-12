<script>
    export let _currentUser;
    import DarkMode from "./DarkMode.svelte";
    import UserDropdown from "./UserDropdown.svelte";
    import Export from "./Export.svelte";
    import SidebarToggle from "./SidebarToggle.svelte";
    import ToggleView from "./ToggleView.svelte";
    export let _state, meta;

    import { onMount } from "svelte";

    onMount(() => {});

    $: console.log($meta.url);
</script>

<div id="navbar" class="user-select-none p-2" class:collapsed={!$_state.navbar.collapsed}>
    <div class="d-flex h-100 align-items-center">
        {#if $meta.url.startsWith("/script/")}
            <SidebarToggle {_state} />

            <a
                class:disabled={!$_state.savedStatus.saved}
                href="/scripts"
                class="btn btn-light btn-sm"
                class:btn-dark={$_state.view.darkMode}
                ><i class="bi bi-chevron-compact-left" /> Scripts
            </a>
        {/if}

        <div class="flex-grow-1 text-center brand fw-bold">
            {$_state.current?.script?.title}

            {#if $meta.url == "/scripts"} <img id="logo" src="/fable-logo-dark.png" />{/if}
        </div>

        <div class="d-flex align-items-center" class:d-none={$_state.navbar.collapsed}>
            <!-- <CollapseToggles {_state} /> -->
            <div class="ms-4"><DarkMode {_state} /></div>
            {#if $meta.url.startsWith("/script/")}
                <div class="ms-1"><Export {_state} /></div>
                <ToggleView {_state} />
            {/if}

            {#if $_currentUser}
                <!-- <div class="fixed-width text-end me-2">D</div> -->
            {/if}
        </div>
    </div>
</div>

<style>
    #logo {
        height: 35px;
    }
</style>
