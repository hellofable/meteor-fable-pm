<script>
    export let card;
    import { colorList } from "/imports/code/colorList";

    function findHexByName(name) {
        const colorObj = colorList.find((item) => item.name === name);
        return colorObj ? colorObj.hex : null;
    }
</script>

<div>
    {#each card.colors as color, i}
        <div class="color-chip rounded-circle d-inline-block me-1" style="background:{findHexByName(color)};" />
    {/each}
</div>

<style>
    .color-chip {
        width: 10px;
        height: 10px;
    }
</style>
