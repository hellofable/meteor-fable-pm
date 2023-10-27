<script>
    export let card;
    export let _state;
    import Swal from "sweetalert2";

    import { scrollAndFlash, scrollToCard } from "/imports/code/scrollToCard";

    function clickInsertCardAtPosition(pos) {
        const el = document.getElementById("card-dropdown-" + card._id);
        const dropdown = bootstrap.Dropdown.getInstance(el);
        dropdown.hide();
        // cardHelpers.insertCardAtPosition(pos);
        // insertNewCardAtPosition(pos);
    }

    function clickRemoveCard() {
        if (card.text) {
            console.log("this card not empty");
            Swal.fire({
                icon: "error",
                position: "top",
                text: "Card must be empty to remove!",
            });
        } else {
            // cardHelpers.removeCard(card._id);
        }
        hideDropdown();
    }

    function hideDropdown() {
        const el = document.getElementById("card-dropdown-" + card._id);
        const dropdown = bootstrap.Dropdown.getInstance(el);
        dropdown.hide();
    }

    function setFocusId() {
        $_state.focusSectionId = card.id;
        hideDropdown();
        // setTimeout(() => {
        //     scrollAndFlash(card.id, "auto");
        // }, 200);
    }
</script>

<div class="card-dropdown-wrapper text-end">
    <button
        id="card-dropdown-{card._id}"
        type="button"
        class="btn btn-link grey-text p-0 pe-2 pt-2 text-dark"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
        <i class="bi bi-three-dots-vertical" />
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
        {#if card.isSection}
            <li>
                <a on:click|stopPropagation={() => setFocusId()} class="dropdown-item" href="#{card._id}">Focus</a>
            </li>
            <li><hr class="dropdown-divider" /></li>
        {/if}
        <li>
            <a on:click|stopPropagation={() => clickInsertCardAtPosition(card.index)} class="dropdown-item" href="#null"
                >Add Card Above</a
            >
        </li>

        <li>
            <a
                on:click|stopPropagation={() => clickInsertCardAtPosition(card.index + 1)}
                class="dropdown-item"
                href="#null">Add Card Below</a
            >
        </li>

        <li><hr class="dropdown-divider" /></li>
        <li>
            <a on:click|stopPropagation={clickRemoveCard} class="dropdown-item" href="#null">Remove Card</a>
        </li>
    </ul>
</div>

<style>
    .card-dropdown-wrapper {
        position: absolute;
        right: 5px;
        top: 2px;
    }
</style>
