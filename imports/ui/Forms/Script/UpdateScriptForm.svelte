<script>
    import * as yup from "yup";
    import { Form, Message } from "svelte-yup";
    import { _state } from "/imports/code/state";
    import { Meteor } from "meteor/meteor";

    let schema = yup.object().shape({
        title: yup.string().required().max(30).label("Script Title"),
    });

    let fields = { title: $_state.modal.scriptTitle, id: $_state.modal.scriptId };
    let submitted = false;
    let isValid;

    function formSubmit() {
        submitted = true;
        isValid = schema.isValidSync(fields);

        if (isValid) {
            Meteor.call("scripts.updateFields", fields);
            $_state.modal.name = null;
            $_state.modal.scriptTitle = null;
            fields = { title: "" };
            submitted = false;
        }
    }
</script>

<Form {schema} {fields} submitHandler={formSubmit} {submitted}>
    <input
        bind:value={fields.title}
        class="form-control"
        type="text"
        placeholder="Script Title"
        aria-label="default input example"
    />

    <div class="ms-1">
        <Message name="title" />
    </div>

    <div class="text-end mt-4">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary"> OK </button>
    </div>
</Form>
