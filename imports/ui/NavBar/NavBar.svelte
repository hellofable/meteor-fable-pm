<script>
    export let _currentUser;
    import UserDropdown from "./UserDropdown/UserDropdown.svelte";
    import CollapseToggles from "./CollapseToggles.svelte";

    import SidebarToggle from "./SidebarToggle.svelte";
    import ToggleView from "./ToggleView.svelte";
    export let _state, meta;
</script>

<navbar class="user-select-none">
    <div class="d-flex h-100 align-items-center">
        <div class="fixed-width">
            {#if $meta.url != "/"} <SidebarToggle {_state} />{/if}
        </div>
        {#if $meta.url != "/"}
            <a class:disabled={!$_state.savedStatus.saved} href="/" class="btn btn-light btn-sm me-2 disabled"
                ><i class="bi bi-chevron-compact-left" /> Scripts
            </a>
        {/if}

        <div class="flex-grow-1 text-center brand p-2">
            <!-- svelte-ignore a11y-missing-attribute -->
            {#if $_state.savedStatus.saved} <a href="/"> <img src="/fable-logo-dark.png" /></a>{/if}
            {#if !$_state.savedStatus.saved} <img src="/fable-logo-dark.png" />{/if}
        </div>

        <div class="d-flex align-items-center">
            {#if $meta.url != "/"}
                <CollapseToggles {_state} />
                <ToggleView {_state} />
            {/if}
            {#if $_currentUser}
                <div class="fixed-width text-end" />
            {/if}
        </div>
    </div>
</navbar>

<style>
    navbar {
        width: 100%;
        display: block;
        background: rgb(218 223 239);
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
