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
        //hello
        // router.location.query.set("card", card._id);
        $_state.current.card._id = card._id;
        // if ($_state.view.mode == "cards") scrollToCard(card._id, "smooth", true);
        // if ($_state.view.mode != "cards") scrollToCard(card._id, "smooth", false);
        scrollToCard(card._id, "smooth", true);
    }

    let sectionDepth = 0;
    $: {
        if (card.pids?.length) {
            const cardId = card.pids[0];
            const parentCard = CardsClientCollection.findOne(cardId);
            sectionDepth = parentCard.sectionDepth;
        } else {
            sectionDepth = 0;
        }
        if (card.isSection) sectionDepth = card.sectionDepth - 1;
        if (!card.isSection) sectionDepth = sectionDepth;

        sectionDepth = sectionDepth * 10;
        if (!card.isSection) sectionDepth = sectionDepth - 10;
        if (sectionDepth < 0) sectionDepth = 0;
    }

    let hasFocus = false;
    $: {
        hasFocus = $_state.current.card._id === card._id ? true : false;
    }
</script>

<div
    style="margin-left: {sectionDepth}px"
    class:d-none={hasCollapsedParent}
    class:is-current={$_state.current.card._id == card._id}
    class="mb-1 p-0 rounded browser-card d-flex"
>
    {#if card.isSection}
        <CollapseIcon {card} />
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->

    <div
        class="w-100 browser-card-title p-2 rounded"
        class:is-section={card.isSection}
        on:click={clickCard}
        href={null}
        class:has-focus={hasFocus}
    >
        <div class="d-flex">
            <!-- <div class="me-2">{sectionDepth}</div> -->
            <BrowserCardContents {card} {_state} {hasFocus} />
        </div>
    </div>
</div>

<style>
    .browser-card-title {
        cursor: pointer;
    }
</style>
