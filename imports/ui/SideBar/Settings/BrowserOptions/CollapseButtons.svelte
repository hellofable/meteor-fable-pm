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

<button
    on:click={expandAll}
    class="btn btn-sm mt-2"
    class:btn-light={!$_state.view.darkMode}
    class:btn-dark={$_state.view.darkMode}><i class="bi bi-arrow-bar-down" /> Expand All</button
>
<button
    on:click={collapseAll}
    class="btn btn-sm mt-1"
    class:btn-light={!$_state.view.darkMode}
    class:btn-dark={$_state.view.darkMode}><i class="bi bi-arrow-bar-up" /> Collapse All</button
>
