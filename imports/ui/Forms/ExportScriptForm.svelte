<script>
    import { _state } from "/imports/code/state";
    import { saveAs } from "file-saver";
    import { _pdfExportOptions } from "/imports/code/pdfExportOptions";
    import { get } from "svelte/store";
    import { checkForTitlePage } from "/imports/code/checkForTitlePage";

    let isWaiting = false;

    function exportMe() {
        // let settings = get(_pdfExportOptions);
        $_pdfExportOptions.print_title_page = true;

        const hasTitlePage = checkForTitlePage();
        $_pdfExportOptions.print_title_page = hasTitlePage;
        Meteor.call("script.exportAsPdf", $_state.current.script._id, $_pdfExportOptions, function (e, r) {
            console.log({ e, r });
            if (!r) return;
            const blob = new Blob([r], { type: "application/pdf", encoding: "UTF-8" });
            // Save the Blob as a PDF file using the FileSaver.js library
            saveAs(blob, "downloaded-file.pdf");
            $_state.modal.name = null;
        });
    }

    function exportAsText() {
        Meteor.call("script.exportAsText", $_state.current.script._id, settings, function (e, r) {
            console.log({ e, r });
            if (!r) return;
            const blob = new Blob([r], { type: "text/plain" });
            // Save the Blob as a PDF file using the FileSaver.js library
            saveAs(blob, "downloaded-file.txt");
            $_state.modal.name = null;
        });
    }
    function updateOption(evt) {
        if (evt.target.name == "print_profile" || evt.target.name == "scenes_numbers") {
            $_pdfExportOptions[evt.target.name] = evt.target.value;
        } else {
            evt.target.checked
                ? ($_pdfExportOptions[evt.target.name] = true)
                : ($_pdfExportOptions[evt.target.name] = false);
        }
    }
</script>

<div class="export-pdf-form">
    <div class="form">
        <div class="container">
            <div class="form-check form-switch">
                <input
                    on:change={(evt) => updateOption(evt)}
                    checked={$_pdfExportOptions.embolden_scene_headers}
                    name="embolden_scene_headers"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault-embolden_scene_headers"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault-embolden_scene_headers"
                    >Bold Scene Headers</label
                >
            </div>
            <div class="form-check form-switch">
                <input
                    on:change={(evt) => updateOption(evt)}
                    checked={$_pdfExportOptions.show_page_numbers}
                    name="show_page_numbers"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault-show_page_numbers"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault-show_page_numbers">Page Numbers</label>
            </div>
            <div class="form-check form-switch">
                <input
                    on:change={(evt) => updateOption(evt)}
                    checked={$_pdfExportOptions.each_scene_on_new_page}
                    name="each_scene_on_new_page"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault-each_scene_on_new_page"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault-each_scene_on_new_page"
                    >Each Scene On New Page</label
                >
            </div>
            <div class="row mt-1">
                <div class="col-6">
                    <div class="my-3">
                        <label for="formControl4" class="form-label">Paper Size</label>
                        <select
                            on:change={(evt) => updateOption(evt)}
                            id="formControl4"
                            name="print_profile"
                            class="form-select"
                        >
                            <option selected={$_pdfExportOptions.print_profile == "usletter"} value="usletter"
                                >US Letter</option
                            >
                            <option selected={$_pdfExportOptions.print_profile == "a4"} value="a4">a4</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="my-3">
                        <label for="formControl5" class="form-label">Number Scenes</label>
                        <select
                            on:change={(evt) => updateOption(evt)}
                            id="formControl5"
                            name="scenes_numbers"
                            class="form-select"
                        >
                            <option selected={$_pdfExportOptions.scenes_numbers == "none"} value="none">None</option>
                            <option selected={$_pdfExportOptions.scenes_numbers == "left"} value="left">Left</option>
                            <option selected={$_pdfExportOptions.scenes_numbers == "right"} value="right">Right</option>
                            <option selected={$_pdfExportOptions.scenes_numbers == "both"} value="both">Both</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex align-items-end">
            <a on:click={exportAsText} class="small" href={null}>Export as Text/Fountain</a>
            <div class="text-end mt-3 flex-grow-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button disabled={isWaiting} on:click={exportMe} class="btn btn-primary" type="submit"> Export </button>
            </div>
        </div>
    </div>
</div>

<style>
    a {
        text-decoration: underline;
        cursor: pointer;
    }
</style>
