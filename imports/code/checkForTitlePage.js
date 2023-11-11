import { CardsClientCollection } from "../api/cardsClient"

export function checkForTitlePage() {
    const firstCard = CardsClientCollection.find({ index: 0 }).fetch()
    if (firstCard.length) {
        const hasTitlePage = firstCard[0].firstLine.startsWith("Title:")
        return hasTitlePage
    }
}