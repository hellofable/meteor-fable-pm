<script>
    export let script, cardsCount;
    function insertCard() {
        Meteor.call("cards.insert", { index: cardsCount++, scriptId: script._id });
    }
</script>

<button class="btn btn-secondary" on:click={insertCard}>Insert Card</button>
