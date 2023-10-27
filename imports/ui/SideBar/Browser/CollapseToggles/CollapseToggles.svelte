<script>
    import { CardsCollection } from "/imports/api/cards";

    function collapseAll() {
        const cards = CardsCollection.find({}).fetch();
        cards.forEach(function (card, index) {
            CardsCollection.direct.update(card._id, {
                $set: { collapsedSidebar: true },
            });
        });
    }

    function expandAll() {
        const cards = CardsCollection.find({}).fetch();
        cards.forEach(function (card, index) {
            CardsCollection.direct.update(card._id, {
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
