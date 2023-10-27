<script>
    export let cardClient;
    let hidden = true;
</script>

<a class="toggle small" href={null} on:click={() => (hidden = !hidden)}>toggle</a>

{#if !hidden}
    {JSON.stringify(cardClient)}
{/if}

<style>
    .toggle {
        position: absolute;
        opacity: 0.2;
        text-decoration: none;
        z-index: 1;
        cursor: pointer;
    }
</style>
