<script>
    export let card;
    import { colorList } from "/imports/code/colorList";

    function findHexByName(name) {
        const colorObj = colorList.find((item) => item.name === name);
        return colorObj ? colorObj.hex : null;
    }
</script>

<div class="notes">
    {#each card.notes as note, i}
        <div class="browsercard-note">{note}</div>
    {/each}
</div>

<style>
    .browsercard-note {
        display: inline;
        background: #c6f08694;
        color: rgb(37, 37, 37);
        font-weight: normal;
        font-style: italic;
        text-transform: none;
        margin: 0 3px 3px 0px;
        padding: 0 3px 0 3px;
    }
</style>
