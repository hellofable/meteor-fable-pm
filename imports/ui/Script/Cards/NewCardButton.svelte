<script>
    export let script, cardsCount;
    function insertCard() {
        Meteor.call("cards.insert", { index: cardsCount++, scriptId: script._id });
    }
</script>

<button class="btn btn-secondary" on:click={insertCard}>Insert Card</button>

<style>
    /* .btn {
        background: rgba(0, 0, 0, 0.1);
        color: white;
    } */
</style>
