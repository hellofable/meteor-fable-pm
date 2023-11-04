<script>
    export let _currentUser;
    import DarkMode from "./DarkMode.svelte";
    import UserDropdown from "./UserDropdown/UserDropdown.svelte";
    import CollapseToggles from "./CollapseToggles.svelte";
    import NavBarToggle from "./NavBarToggle.svelte";
    import SidebarToggle from "./SidebarToggle.svelte";
    import ToggleView from "./ToggleView.svelte";
    export let _state, meta;

    import { onMount } from "svelte";

    onMount(() => {});
</script>

<navbar id="navbar" class="user-select-none" class:collapsed={!$_state.navbar.collapsed}>
    <div class="d-flex h-100 align-items-center">
        {#if $meta.url != "/"} <SidebarToggle {_state} />{/if}
        {#if $meta.url != "/"}
            <a
                class:disabled={!$_state.savedStatus.saved}
                href="/"
                class="btn btn-sm me-2 btn-light"
                class:btn-dark={$_state.view.darkMode}
                ><i class="bi bi-chevron-compact-left" /> Scripts
            </a>
        {/if}
        <!-- <NavBarToggle {_state} /> -->

        <div class="flex-grow-1 text-center brand p-2">
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- {#if $_state.savedStatus.saved} <a href="/"> <img src="/fable-logo-dark.png" /></a>{/if}
            {#if !$_state.savedStatus.saved} <img src="/fable-logo-dark.png" />{/if} -->
        </div>

        <div class="d-flex align-items-center" class:d-none={$_state.navbar.collapsed}>
            <DarkMode {_state} />
            {#if $meta.url != "/"}
                <!-- <CollapseToggles {_state} /> -->
                <ToggleView {_state} />
            {/if}

            {#if $_currentUser}
                <!-- <div class="fixed-width text-end me-2">D</div> -->
            {/if}
        </div>
    </div>
</navbar>

<style>
    navbar {
        display: block;
    }

    .brand img {
        height: 30px;
        opacity: 0.3;
    }

    .help-text {
        text-transform: uppercase;
        font-weight: 300;
    }
</style>
