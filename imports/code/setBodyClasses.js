import { _state } from "/imports/code/state"

export function setBodyClasses() {
    const stateSubscription = _state.subscribe(state => {
        // sidebar class
        if (state.sidebar.show) {
            window.document.body.classList.remove("sidebar-closed");
            window.document.body.classList.add("sidebar-open");
        } else {
            window.document.body.classList.add("sidebar-closed");
            window.document.body.classList.remove("sidebar-open");
        }

        // dark/light class
        if (state.darkMode) {
            window.document.body.classList.remove("light");
            window.document.body.classList.add("dark");
        } else {
            window.document.body.classList.add("light");
            window.document.body.classList.remove("dark");
        }


        if (state.view.mode == "cards") {
            window.document.body.classList.remove("page-view");
            window.document.body.classList.add("card-view");
        } else {
            window.document.body.classList.add("page-view");
            window.document.body.classList.remove("card-view");
        }



        if (state.view.darkMode) {
            window.document.body.classList.add("dark");
            window.document.body.classList.remove("light");
            document.body.setAttribute("data-bs-theme", "dark");
        }

        if (!state.view.darkMode) {
            window.document.body.classList.add("light");
            window.document.body.classList.remove("dark");
            document.body.removeAttribute("data-bs-theme", "dark");
        }



        if (state.view.fullWidth) {
            window.document.body.classList.add("full-width");
        } else {

            window.document.body.classList.remove("full-width");
        }

    })
}

