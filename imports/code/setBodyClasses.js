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


        if (state.cardView) {
            window.document.body.classList.remove("full-view");
            window.document.body.classList.add("card-view");
        } else {
            window.document.body.classList.add("full-view");
            window.document.body.classList.remove("card-view");
        }





    })
}

