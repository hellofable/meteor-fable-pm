<script>
    import { CardsClientCollection } from "/imports/api/cardsClient";
    export let _state;

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
        <button
            on:click={collapseAll}
            class="btn btn-sm w-100 border-0"
            class:btn-light={!$_state.view.darkMode}
            class:btn-dark={$_state.view.darkMode}><i class="bi bi-arrow-bar-up" /> Collapse All</button
        >
    </div>
    <div class="text-center w-100">
        <button
            on:click={expandAll}
            class="btn btn-sm w-100 border-0"
            class:btn-light={!$_state.view.darkMode}
            class:btn-dark={$_state.view.darkMode}><i class="bi bi-arrow-bar-down" /> Expand All</button
        >
    </div>
</div>
