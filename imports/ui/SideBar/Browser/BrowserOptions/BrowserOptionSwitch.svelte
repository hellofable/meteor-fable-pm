<script>
    export let _state, option;
</script>

<div class="form-check form-switch text-right mt-2">
    <input
        on:change={() => {
            $_state.sidebar.browserOptions.show[option.name] = !$_state.sidebar.browserOptions.show[option.name];
        }}
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="switch-show-{option.name}"
        checked={$_state.sidebar.browserOptions.show[option.name]}
    />
    <label class="form-check-label small" for="switch-show-{option.name}"
        ><span style="text-transform:capitalize;">{option.label}</span></label
    >
</div>
