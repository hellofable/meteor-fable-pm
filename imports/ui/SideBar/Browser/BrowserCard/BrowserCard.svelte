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
            console.log(card.text);
            console.log("no pids?");
            sectionDepth = 0;
        }
        if (card.isSection) sectionDepth = (card.sectionDepth - 1) * 10;
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

    <a class="w-100 ms-1 card-title p-2 rounded" class:is-section={card.isSection} on:click={clickCard} href={null}>
        <BrowserCardContents {card} {_state} />
    </a>
</div>

<style>
    .browser-card .card-title {
        background: white;
        min-height: 41px;
    }

    .browser-card .card-title.is-section {
        background: rgb(238, 243, 226);
    }

    a {
        display: inline-block;
        text-decoration: none;
        color: #000;
    }
    .browser-card {
        background: none;
    }

    .op-50 {
        opacity: 0.5;
    }

    .is-current {
        box-shadow: 5px 0 0 0 #8cd18c;
    }
</style>
