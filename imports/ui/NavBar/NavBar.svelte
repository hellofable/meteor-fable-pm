<script>
    export let _currentUser;
    import DarkMode from "./DarkMode.svelte";
    import UserDropdown from "./UserDropdown/UserDropdown.svelte";
    import CollapseToggles from "./CollapseToggles.svelte";

    import SidebarToggle from "./SidebarToggle.svelte";
    import ToggleView from "./ToggleView.svelte";
    export let _state, meta;

    import { onMount } from "svelte";
    function drag_start(event) {
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData(
            "text/plain",
            parseInt(style.getPropertyValue("left"), 10) -
                event.clientX +
                "," +
                (parseInt(style.getPropertyValue("top"), 10) - event.clientY)
        );
    }
    function drag_over(event) {
        event.preventDefault();
        return false;
    }
    function drop(event) {
        var offset = event.dataTransfer.getData("text/plain").split(",");
        var dm = document.getElementById("dragme");
        dm.style.left = event.clientX + parseInt(offset[0], 10) + "px";
        dm.style.top = event.clientY + parseInt(offset[1], 10) + "px";
        event.preventDefault();
        return false;
    }

    onMount(() => {
        var dm = document.getElementById("dragme");
        dm.addEventListener("dragstart", drag_start, false);
        document.body.addEventListener("dragover", drag_over, false);
        document.body.addEventListener("drop", drop, false);
    });
</script>

<navbar id="dragme" draggable="true" class="user-select-none">
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
            <!-- {#if $_state.savedStatus.saved} <a href="/"> <img src="/fable-logo-dark.png" /></a>{/if}
            {#if !$_state.savedStatus.saved} <img src="/fable-logo-dark.png" />{/if} -->
        </div>

        <div class="d-flex align-items-center">
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
        width: 400px;
        display: block;
        position: fixed;
        z-index: 123;
        border-radius: 12px;
        bottom: 35px;
        right: 50px;
        opacity: 0.4;
        height: 50px;
    }

    navbar:hover {
        opacity: 1;
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
