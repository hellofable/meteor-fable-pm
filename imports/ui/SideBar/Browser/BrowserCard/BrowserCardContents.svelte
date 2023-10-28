<script>
    import ColorChips from "./ColorChips.svelte";
    import Notes from "./Notes.svelte";

    export let card, _state;
</script>

<div class="position-relative">
    {#if $_state.sidebar.browserOptions.show.colors} <ColorChips {card} />{/if}
    {#if $_state.sidebar.browserOptions.show.firstline}
        <div class="op-50 me-2">{"#".repeat(card.sectionDepth)} {@html card.firstLine || ""}</div>{/if}

    {#if $_state.sidebar.browserOptions.show.notes} <Notes {card} />{/if}
</div>
