<script>
    export let _state;
    // import { scrollToCard } from "/imports/code/scrollToCard.js";

    function setView(mode) {
        if ($_state.view.mode == "page" && mode == "page") {
            console.log("same");
            $_state.view.fullWidth = !$_state.view.fullWidth;
        }
        $_state.view.mode = mode;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="btn-group" role="group" aria-label="Basic outlined example">
    <button
        on:click={() => {
            setView("cards");
        }}
        class:active={$_state.view.mode == "cards"}
        type="button"
        class:btn-outline-light={!$_state.view.darkMode}
        class:btn-dark={$_state.view.darkMode}
        class:border-0={$_state.view.darkMode}
        class="btn"><i class="bi bi-card-text" /></button
    >
    <button
        on:click={() => {
            setView("page");
        }}
        class:active={$_state.view.mode == "page"}
        type="button"
        class:btn-outline-light={!$_state.view.darkMode}
        class:btn-dark={$_state.view.darkMode}
        class:border-0={$_state.view.darkMode}
        class="btn"><i class="bi bi-file-text" /></button
    >
</div>
