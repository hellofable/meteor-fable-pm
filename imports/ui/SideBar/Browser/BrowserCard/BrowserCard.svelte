<script>
    export let card, _state, meta;

    import CollapseIcon from "./CollapseIcon.svelte";

    import { CardsClientCollection } from "/imports/api/cardsClient";

    import { scrollAndFlash, scrollToCard } from "/imports/code/scrollToCard";
    import BrowserCardContents from "./BrowserCardContents.svelte";

    $: hasCollapsedParent = CardsClientCollection.find({
        _id: { $in: card.pids || [] },
        collapsedSidebar: true,
    }).count();

    function clickCard() {
        // router.location.query.set("card", card._id);
        scrollToCard(card._id, "smooth", true);
    }

    let sectionDepth = 0;
    $: {
        if (card.pids?.length) {
            const cardId = card.pids[0];
            const parentCard = CardsClientCollection.findOne(cardId);
            sectionDepth = parentCard.sectionDepth * 10;
        } else {
            sectionDepth = 0;
        }
        if (card.isSection) sectionDepth = (card.sectionDepth - 1) * 10;
        if (!card.isSection) sectionDepth = sectionDepth + 15;
    }
</script>

<div
    style="margin-left: {0}px"
    class:d-none={hasCollapsedParent}
    class:is-current={$_state.current.card._id == card._id}
    class="mb-1 p-0 rounded browser-card d-flex"
>
    {#if card.isSection}
        <CollapseIcon {card} />
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->

    <div
        class="w-100 ms-1 browser-card-title p-2 rounded"
        class:is-section={card.isSection}
        on:click={clickCard}
        href={null}
    >
        <BrowserCardContents {card} {_state} />
    </div>
</div>

<style>
    .browser-card-title {
        cursor: pointer;
    }
</style>
