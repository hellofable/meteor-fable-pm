<script>
    import { Meteor } from "meteor/meteor";
    export let script, _state, meta;
    import { router } from "tinro";

    import Swal from "sweetalert2";

    function updateScript() {
        $_state.modal.name = "updateScript";
        $_state.modal.scriptId = script._id;
        $_state.modal.scriptTitle = script.title;
    }

    function trashScript() {
        Swal.fire({
            title: "Move this script to the trash?",
            showCancelButton: true,
            heightAuto: false,
            reverseButtons: true,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // Swal.fire("Trashed!", "", "success");

                Meteor.call("scripts.moveToTrash", script._id, function (error, result) {
                    // console.log(result);
                    // if (result == 1) router.goto("/project/" + $meta.params.pid + "/script/all");
                    // console.log("sup?");
                });

                // setTimeout(() => router.goto("/project/" + $meta.params.pid + "/script/all"), 1000);
                // window.location.replace("/project/" + $meta.params.pid + "/script/all");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
</script>

<div class="dropdown">
    <button
        class="btn btn-x btn-link border-0"
        type="button"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
        <i class="bi bi-three-dots-vertical" />
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li><a on:click={updateScript} class="dropdown-item" href={null}>Rename</a></li>
        <li><a on:click={trashScript} class="dropdown-item" href={null}>Trash</a></li>
    </ul>
</div>

<style>
    .dropdown button {
        opacity: 0.3;
    }
</style>
