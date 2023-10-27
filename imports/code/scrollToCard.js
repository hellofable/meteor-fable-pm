

import { CardsCollection } from "/imports/api/cards";

let attempts = 0;



export function setCaretToEnd(target) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(target);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    target.focus();
    range.detach(); // optimization
    // set scroll to the end if multiline
    target.scrollTop = target.scrollHeight;
}

function flashCard(cardElement) {
    setTimeout(() => { cardElement.classList.add("flash-yellow") }, 0);
    setTimeout(() => { cardElement.classList.remove("flash-yellow") }, 1000);
}

function shakeCard(cardElement) {
    console.log("shake me")
    setTimeout(() => { cardElement.classList.add("shake-element") }, 0);
    setTimeout(() => { cardElement.classList.remove("shake-element") }, 1000);
}

export async function scrollToCard(cardId, behaivor, flash) {





    const el = document.getElementById("card-" + cardId)


    // we wont have an el if we are in a subsection and the clicked cards isn't a child
    if (!el) {
        shakeCard(document.getElementById("sidebar-item-" + cardId));
        return
    }

    const cardIsVisible = el.offsetParent
    if (cardIsVisible) {
        scrollAndFlash(cardId, behaivor, flash)


        // _state.setKey("active.card", cardId)
    }


    if (!cardIsVisible) {
        // loop though the parents and scroll to the first visible
        const pids = CardsCollection.findOne(cardId).pids

        pids.every(pid => {
            const cardIsVisible = document.getElementById("card-" + pid).offsetParent
            if (cardIsVisible) {
                scrollAndFlash(pid, "smooth", flash);
                return false
            }
            return true
        });
    }

}

// let scrollingTimer;
// function x(scrollingTimer, cardElement) {
//     const cardsEl = document.getElementById("cards")
//     // Clear the previous timer
//     clearTimeout(scrollingTimer);
//     // Set a new timer after the scroll event is triggered
//     scrollingTimer = setTimeout(function () {
//         // Scrolling has ended, perform your desired actions here
//         console.log('Scrolling has ended');
//         flashCard(cardElement);

//     }, 250); // Adjust the delay (in milliseconds) to your desired threshold
// }

export function scrollAndFlash(cardId, behavior, flash) {


    // const cardAnchor = document.getElementById("card-anchor-" + cardId);
    const cardAnchor = document.getElementById("card-" + cardId);
    const cardElement = document.getElementById("card-" + cardId);


    cardAnchor.scrollIntoView({ behavior, block: 'start' });




    attempts = 0;
    checkElementVisibility(cardElement, () => {
        // console.log('Element is visible');
        if (flash) setTimeout(() => flashCard(cardElement), 200);
        setTimeout(() => {
            const textarea = document.getElementById("textarea-" + cardId)
            textarea.focus()
            textarea.scrollTop = 0;
            textarea.setSelectionRange(0, 0);
        }, 400)


    });

}



function checkElementVisibility(element, callback) {
    const rect = element.getBoundingClientRect();
    // const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
    const isVisible = (rect.top >= 0 && rect.top <= window.innerHeight);
    if (isVisible) {
        callback(); // Run the function if the element is visible
    } else {
        attempts++;
        // console.log(attempts)
        if (attempts < 10) {
            setTimeout(() => checkElementVisibility(element, callback), 200);
        } else {
            console.log('Element is not visible after', 10, 'attempts');
        }
    }
}