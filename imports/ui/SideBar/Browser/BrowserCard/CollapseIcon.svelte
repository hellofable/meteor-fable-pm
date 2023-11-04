<script>
    export let card;

    import { CardsClientCollection } from "/imports/api/cardsClient";

    function toggle() {
        CardsClientCollection.update(card._id, {
            $set: { collapsedSidebar: !card.collapsedSidebar },
        });
    }

    // <div class=""></div>
</script>

<button class="py-2 px-1 rounded border-0" href={null} on:click={toggle}>
    {#if card.collapsedSidebar}<i class="bi bi-chevron-right" />{/if}
    {#if !card.collapsedSidebar}<i class="bi bi-chevron-down" />{/if}
</button>
