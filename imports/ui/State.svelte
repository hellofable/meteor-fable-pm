<script>
    export let _state;
    let show = false;
</script>

<a on:click={() => (show = !show)} class="small link" href={null}>state</a>
{#if show}
    <pre class=" state p-4 bg-light state">
        {JSON.stringify($_state, null, 4)}
    </pre>
{/if}

<style>
    .link {
        position: fixed;
        top: 0;
        cursor: pointer;
    }

    .state {
        width: 100vw;
        white-space: pre-wrap;
    }
</style>
