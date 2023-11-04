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

<div class="w-100 text-left d-flex">
    <div class="text-center me-1 w-100">
        <button on:click={collapseAll} class="btn btn-secondary btn-sm w-100"
            ><i class="bi bi-arrow-bar-up" /> Collapse All</button
        >
    </div>
    <div class="text-center w-100">
        <button on:click={expandAll} class="btn btn-secondary btn-sm w-100"
            ><i class="bi bi-arrow-bar-down" /> Expand All</button
        >
    </div>
</div>
