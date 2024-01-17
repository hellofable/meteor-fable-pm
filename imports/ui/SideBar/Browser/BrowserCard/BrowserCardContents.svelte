<script>
    import ColorChips from "./ColorChips.svelte";
    import Notes from "./Notes.svelte";
    import { scrollToCard } from "/imports/code/scrollToCard";

    export let card, _state, hasFocus;
    let truncated_line = "";

    $: if (card.firstLine) {
        if (card.firstLine.length > 39) {
            truncated_line = card.firstLine.substring(0, 40) + "...";
        } else truncated_line = card.firstLine;
    }
</script>

<div class="card-contents position-relative">
    {#if $_state.sidebar.browserOptions.show.colors}
        <ColorChips {card} />{/if}
    {#if $_state.sidebar.browserOptions.show.firstline}
        {"#".repeat(card.sectionDepth)}
        <!-- {@html card.firstLine || ""} -->
        {truncated_line}
    {/if}

    {#if $_state.sidebar.browserOptions.show.notes}
        <Notes {card} />{/if}
</div>

<style>
    .card-contents {
        min-height: 20px;
        font-weight: 400;
    }
</style>
