<script>
    export let _state, script, meta;
    let trashButton, popover;
    import Swal from "sweetalert2";
    import { onDestroy, onMount } from "svelte";
    onMount(() => {
        popover = new bootstrap.Popover(trashButton);
    });

    function restore() {
        Meteor.call("scripts.restore", script._id);
        // $_state.sidebar.inTrash = false;
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "success",
            title: "Script restored!",
        });
        popover.hide();
    }
</script>

<button
    on:click={restore}
    bind:this={trashButton}
    data-bs-toggle="popover"
    data-bs-trigger="hover"
    data-bs-content="Restore Script"
    class="btn btn-success btn btn-sm trash px-2"><i class="bi bi-arrow-up-square-fill" /></button
>
