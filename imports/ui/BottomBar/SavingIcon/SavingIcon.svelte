<script>
    export let _state;
    import BarsSpinner from "./BarsSpinner.svelte";
</script>

{#if !$_state.savedStatus.saved}
    <div class="cloud-unsaved blink_me d-flex align-items-center">
        <!-- <div class="saving-text me-1 fw-bold">saving</div> -->
        <div><i class="bi bi-cloud-upload-fill" /></div>
    </div>
{/if}
{#if $_state.savedStatus.saved}
    <div class="cloud-icon">
        <i class="bi bi-cloud-check-fill" />
    </div>
{/if}

<style>
    .cloud-icon {
        padding-top: 3px;
        font-size: 22px;
        color: grey;
    }

    .cloud-unsaved {
        position: relative;
        top: 3px;
        padding-top: 3px;
        font-size: 22px;
    }

    .blink_me {
        animation: blinker 2s linear infinite;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }

    .saving-text {
        font-family: monospace;
        font-size: 15px;
    }
</style>
