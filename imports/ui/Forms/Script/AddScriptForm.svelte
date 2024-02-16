<script>
    import * as yup from "yup";
    import { Form, Message } from "svelte-yup";
    import { _state } from "/imports/code/state";
    import { Meteor } from "meteor/meteor";
    import { onMount } from "svelte";

    let showFile = false;

    let fileInput, fileContents;

    let schema = yup.object().shape({
        title: yup.string().required().max(30).label("Script Title"),
    });

    console.log(schema);

    let fields = { title: "", projectId: $_state.modal.projectId };
    let submitted = false;
    let isValid;

    function formSubmit() {
        submitted = true;
        isValid = schema.isValidSync(fields);
        console.log("submitted");
        if (isValid) {
            if (fileContents && showFile) fields.text = fileContents;
            if (fileContents) console.log({ fileContents });
            Meteor.call("scripts.insert", fields);

            $_state.modal.name = null;
            $_state.modal.projectId = null;
            fields = { title: "", id: "", text: "" };
            submitted = false;
        }
    }

    function readSingleFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }

        const splitFileName = file.name.split(".");
        fields.title = splitFileName[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            fileContents = e.target.result;
        };
        reader.readAsText(file);
    }

    onMount(() => {
        fileInput.addEventListener("change", readSingleFile, false);
    });

    $: if (showFile) fileInput.click();
</script>

<Form autoComplete="off" {schema} {fields} submitHandler={formSubmit} {submitted}>
    <input autoComplete="off" bind:value={fields.title} class="form-control" type="text" placeholder="Script Title" />

    <div class="ms-1">
        <Message name="title" />
    </div>

    <div class="mt-4">
        <input class:d-none={!showFile} bind:this={fileInput} type="file" id="file-input" />
    </div>

    <div class="text-end mt-4">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">
            {#if showFile && fileContents}
                Import Script
            {:else}
                New Script
            {/if}
        </button>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => (showFile = !showFile)} class="btn btn-sm btn-link p-0">
        {#if !showFile}
            import from text/fountain file{/if}
        {#if showFile}
            don't import file{/if}
    </div>
</Form>
