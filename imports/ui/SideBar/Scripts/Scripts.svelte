<script>
    import { onDestroy, onMount } from "svelte";
    import { Meteor } from "meteor/meteor";
    import { ScriptsCollection } from "/imports/api/scripts";
    import ScriptCard from "./ScriptCard/ScriptCard.svelte";
    import NewScriptButton from "./NewScriptButton.svelte";
    import { router } from "tinro";
    import TrashButton from "./TrashButton.svelte";

    export let _state, meta;

    let scripts, sub, inTrash, inTrashCount;
    onMount(() => {
        sub = Meteor.subscribe("scripts.project", $meta.params.pid);
    });

    onDestroy(() => {
        console.log("stopping scripts sub");
        sub.stop();
    });

    $: if (!$_state.sidebar.inTrash) {
        scripts = ScriptsCollection.find(
            { projectId: $meta.params.pid, inTrash: { $ne: true } },
            { sort: { title: 1 } }
        );
    }

    $: if ($_state.sidebar.inTrash) {
        scripts = ScriptsCollection.find(
            { projectId: $meta.params.pid, inTrash: { $eq: true } },
            { sort: { title: 1 } }
        );
    }

    $: if ($scripts?.length && $meta.params.sid == "all")
        router.goto("/project/" + $meta.params.pid + "/script/" + $scripts[0]._id);

    $: inTrashCount = ScriptsCollection.find(
        { projectId: $meta.params.pid, inTrash: { $eq: true } },
        { sort: { title: 1 } }
    );
</script>

{#if $scripts}
    <div class="d-flex flex-column h-100">
        <div class="flex-grow-1 px-2 overflow-y-scroll">
            {#if $scripts.length == 0 && $_state.sidebar.inTrash}
                <div class="alert alert-primary rounded-0 d-flex align-items-center">
                    <div class="flex-grow-1">Trash is empty</div>
                    <button on:click={() => ($_state.sidebar.inTrash = false)} class="btn btn-sm btn-link p-0 m-0"
                        >(close)</button
                    >
                </div>
            {/if}

            {#each $scripts as script, i}
                <div class="script-card mb-2"><ScriptCard {script} {meta} {_state} /></div>
            {/each}
            {#if !$_state.sidebar.inTrash}
                <NewScriptButton {_state} {meta} />
            {/if}
        </div>
        <div class="text-start p-2 trash-icon">
            <TrashButton {_state} inTrashCount={$inTrashCount.length} />
        </div>
    </div>
{/if}

<style>
    .script-card {
        height: 100px;
    }

    .synopsis-card {
        background: rgb(109 150 73);
        color: white;
    }

    .trash-icon {
        opacity: 0.8;
    }

    .trash-icon:hover {
        opacity: 1;
    }

    .btn-link {
        text-decoration: none;
    }
</style>
