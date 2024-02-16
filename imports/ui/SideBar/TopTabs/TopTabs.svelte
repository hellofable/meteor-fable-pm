<script>
    export let _state;
    let buttons = ["projects", "browser"];
    function clickButton(buttonTitle) {
        $_state.sidebar.selected = buttonTitle;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>

<div class="btn-group p-2" role="group" aria-label="Basic example">
    {#each buttons as button}
        <button
            on:click={() => {
                clickButton(button);
            }}
            type="button"
            class:active={$_state.sidebar.selected == button}
            class="btn btn-secondary active">{capitalizeFirstLetter(button)}</button
        >
    {/each}
</div>
