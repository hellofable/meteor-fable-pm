<script>
    import ColorChips from "./ColorChips.svelte";
    import Notes from "./Notes.svelte";
    import { scrollToCard } from "/imports/code/scrollToCard";

    export let card, _state, hasFocus;
</script>

<div class="card-contents position-relative">
    {#if $_state.sidebar.browserOptions.show.colors} <ColorChips {card} />{/if}
    {#if $_state.sidebar.browserOptions.show.firstline}
        {"#".repeat(card.sectionDepth)}
        {@html card.firstLine || ""}
    {/if}

    {#if $_state.sidebar.browserOptions.show.notes} <Notes {card} />{/if}
</div>

<style>
    .card-contents {
        min-height: 20px;
    }
</style>
