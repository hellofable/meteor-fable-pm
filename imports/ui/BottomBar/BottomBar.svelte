<script>
    export let _state, meta;
    let script, project;
    export let _currentUser;
    import SavingIcon from "./SavingIcon/SavingIcon.svelte";
    import { useTracker } from "meteor/rdb:svelte-meteor-data";
    import { ScriptsCollection } from "/imports/api/scripts";

    import { onMount } from "svelte";
    import UserDropdown from "../NavBar/UserDropdown.svelte";

    onMount(() => {
        // projectSub = Meteor.subscribe("projects.one", $meta.params.pid, function () {
        //     project = useTracker(() => ProjectsCollection.findOne($meta.params.pid));
        // });
    });

    $: if ($meta.params.sid) {
        script = useTracker(() => ScriptsCollection.findOne($meta.params.sid));
    }

    $: if ($meta.params.pid) {
        project = useTracker(() => ProjectsCollection.findOne($meta.params.pid));
    }
</script>

<div class="bottom-bar d-flex ps-4 pe-2 align-items-center">
    <div class="project-name fs-italics me-3">
        {#if $script?.title}
            <span class="fw-bold"> {$script.title}</span>
        {/if}
    </div>
    <SavingIcon {_state} />

    <div class="flex-grow-1" />

    <UserDropdown {_currentUser} />
</div>

<style>
    .bottom-bar {
        background: rgb(240 195 195);
        z-index: 10;
        position: relative;
    }
</style>
