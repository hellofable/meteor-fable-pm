<script>
    import { Meteor } from "meteor/meteor";
    import { _state } from "/imports/code/state";
    import { saveAs } from "file-saver";

    function exportText() {}
    function exportPdf() {
        Meteor.call("script.exportAsPdf", $_state.current.script._id, function (e, r) {
            console.log({ e, r });

            if (!r) return;
            const blob = new Blob([r], { type: "application/pdf", encoding: "UTF-8" });
            // Save the Blob as a PDF file using the FileSaver.js library
            saveAs(blob, "downloaded-file.pdf");
            $_state.modal.name = null;
        });
    }
</script>

<button on:click={exportPdf} class="btn btn-secondary me-2"> <i class="bi bi-filetype-pdf" /> Download As PDF</button>

<button on:click={exportText} class="btn btn-secondary me-2"> <i class="bi bi-alphabet" /> Download As Text</button>
