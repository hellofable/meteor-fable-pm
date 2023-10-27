<script>
    export let _state;
    // import { scrollToCard } from "/imports/code/scrollToCard.js";

    function setCardView(mode) {
        if ($_state.lastFocusCardId) {
            setTimeout(() => {
                // scrollToCard($_state.lastFocusCardId, "instant", false);
            }, 100);
        }

        $_state.cardView = mode;

        $_state.initAllCards = true;
        setTimeout(() => {
            $_state.initAllCards = false;
        }, 100);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="p-2">
    <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button
            on:click={() => {
                setCardView(true);
            }}
            class:active={$_state.cardView}
            type="button"
            class="btn btn-outline-light"><i class="bi bi-card-text" /></button
        >
        <button
            on:click={() => {
                setCardView(false);
            }}
            class:active={!$_state.cardView}
            type="button"
            class="btn btn-outline-light"><i class="bi bi-file-text" /></button
        >
    </div>
</div>
