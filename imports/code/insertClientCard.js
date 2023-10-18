
import { CardsClientCollection } from "../api/cardsClient"



// export function createClientCards(cards) {
//     cards.forEach(card => {
//         CardsClientCollection.insert({ _id: card._id, text: card.text })
//     });
// }

export function insertClientCard(card) {
    CardsClientCollection.insert({ _id: card._id, text: card.text })
}





window.CardsClientCollection = CardsClientCollection