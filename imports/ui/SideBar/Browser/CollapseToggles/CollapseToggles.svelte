<script>
    import { CardsClientCollection } from "/imports/api/cardsClient";

    function collapseAll() {
        const cards = CardsClientCollection.find({}).fetch();
        cards.forEach(function (card, index) {
            CardsClientCollection.direct.update(card._id, {
                $set: { collapsedSidebar: true },
            });
        });
    }

    function expandAll() {
        const cards = CardsClientCollection.find({}).fetch();
        cards.forEach(function (card, index) {
            CardsClientCollection.direct.update(card._id, {
                $set: { collapsedSidebar: false },
            });
        });
    }
</script>

<div class="wrapper">
    <button on:click={collapseAll} class="btn btn-light border shadow"><i class="bi bi-arrow-bar-up" /></button>
    <button on:click={expandAll} class="btn btn-light border shadow"><i class="bi bi-arrow-bar-down" /></button>
</div>

<style>
    .btn {
        width: 40px;
        border-radius: 17px;
        opacity: 0.5;
    }
    .wrapper {
        position: absolute;
        left: 210px;
        bottom: 3px;
    }
</style>
