<script>
    import { CardsCollection } from "/imports/api/cards";
    export let _state;

    function collapseAll() {
        const cards = CardsCollection.find({}).fetch();
        cards.forEach(function (card, index) {
            CardsCollection.direct.update(card._id, {
                $set: { collapsed: true },
            });
        });
    }

    function expandAll() {
        const cards = CardsCollection.find({}).fetch();
        cards.forEach(function (card, index) {
            CardsCollection.direct.update(card._id, {
                $set: { collapsed: false },
            });
        });
    }
</script>

<div class="">
    <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button
            on:mouseleave={() => {
                $_state.hoverTip = null;
            }}
            on:mouseenter={() => {
                $_state.hoverTip = "Collape All Cards";
            }}
            on:click={collapseAll}
            class="btn border"><i class="bi bi-arrow-bar-up" /></button
        >
        <button on:click={expandAll} class="btn border"><i class="bi bi-arrow-bar-down" /></button>
    </div>
</div>

<style>
</style>
