import Swal from "sweetalert2";
import _ from "lodash"


import { _state } from "/imports/code/state"
let background


// const stateSubscription = _state.subscribe(state => {
//     console.log(state.user.profile.darkMode);
//     if (state.user.profile.darkMode) background = "blue"
//     if (!state.user.profile.darkMode) background = "green"
// })

const gridListCustomClass = {
    container: 'swal-toast-view-buttons',
}




let alerts = {
    "auth.signIn.success": {
        text: "Sign-in successful",
        icon: "success",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background

    },
    "auth.signIn.error": {
        text: "Sorry, can't login with that account",
        icon: "error",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "auth.createUser.success": {
        text: "Welcome!",
        icon: "success",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "auth.createUser.error": {
        text: "That account already exists",
        icon: "error",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "grid.small.active": {
        text: "Small Grid View",
        position: "top-end",
        toast: true,
        timer: 2000,
        timerProgressBar: false,
        showConfirmButton: false,
        background,
        customClass: gridListCustomClass

    },
    "grid.large.active": {
        text: "Large Grid View",
        position: "top-end",
        toast: true,
        timer: 2000,
        timerProgressBar: false,
        showConfirmButton: false,
        background,
        customClass: gridListCustomClass

    },
    "list.active": {
        text: "Standard View",
        position: "top-end",
        toast: true,
        timer: 2000,
        timerProgressBar: false,
        showConfirmButton: false,
        background,
        customClass: gridListCustomClass
    },
    "password.change.error": {
        text: "Current Password Incorrect",
        icon: "error",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "password.change.success": {
        text: "Password Changed Successfully",
        icon: "success",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "password.lost.sendEmail.success": {
        text: "Please Check Your Email",
        icon: "success",
        position: "top-end",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "password.lost.sendEmail.failure": {
        text: "Can't send email. Please check address and try again.",
        icon: "error",
        position: "top-end",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "password.reset.expiredToken": {
        text: "This token has expired",
        icon: "error",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "script.archive": {
        text: "Script Archived",
        icon: "success",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "script.unArchive": {
        text: "Script Restored",
        icon: "success",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "script.remove": {
        text: "Script Deleted!",
        icon: "success",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background
    },
    "focusMode.cantEnable": {
        html: "<b class=\"green-text\">Focus Mode</b> can only be enabled if you have Sections in your script. Please see the <a target=\"_blank\" href=\"/faq\">Questions & Answers</a> page for help on how to add Sections.",
        // icon: "error",
        position: "top-end",
        toast: false,
        timerProgressBar: true,
        showConfirmButton: true,

    },
}

export function doAlert(alert) {




    if (alerts[alert].toast) {
        const state = _state.get()
        const darkMode = _.get(state, "user.profile.darkMode")
        if (darkMode) {
            alerts[alert].background = "#252562"
            alerts[alert].color = "black"
        } else {
            alerts[alert].background = "rgb(137 255 137)"
        }
    }



    Swal.fire(alerts[alert]);
}

window.da = doAlert
