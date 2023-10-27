<script>
    export let _state, script, meta;
    import Swal from "sweetalert2";
    let trashButton, popover;
    import { onDestroy, onMount } from "svelte";
    import { router } from "tinro";
    onMount(() => {
        popover = new bootstrap.Popover(trashButton);
    });

    function remove() {
        Swal.fire({
            title: "Delete this script permanently?",
            showCancelButton: true,
            heightAuto: false,
            icon: "warning",
            position: "top",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Meteor.call("scripts.remove", script._id);
                // $_state.sidebar.inTrash = false;
                // setTimeout(() => router.goto("/project/" + $meta.params.pid + "/script/all"), 100);
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

        popover.hide();
    }
</script>

<button
    on:click={remove}
    bind:this={trashButton}
    data-bs-toggle="popover"
    data-bs-trigger="hover"
    data-bs-content="Delete Script"
    class="btn btn-danger btn btn-sm trash px-2"><i class="bi bi-x-circle-fill" /></button
>
