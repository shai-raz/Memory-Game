import { useEffect, useState } from 'react'
import '../css/card.css'

const Card = (props) => {
    const value = props.value
    const index = props.index
    const currentlyFlipped = props.currentlyFlipped
    const foundCards = props.foundCards
    const { setCurrentlyFlipped } = props.setCurrentlyFlipped

    const [isFound, setIsFound] = useState(foundCards.includes(index))
    const [isFlipped, setIsFlipped] = useState(currentlyFlipped.includes(index))

    const flipCard = () => {
        if (currentlyFlipped.length === 2 || isFlipped) return

        setIsFlipped(true)
        setCurrentlyFlipped([...currentlyFlipped, index])
    }

    useEffect(() => {
        if (currentlyFlipped.includes(index) || foundCards.includes(index))
            setIsFlipped(true)
        else
            setIsFlipped(false)

        setIsFound(foundCards.includes(index))
    }, [currentlyFlipped, foundCards, index])

    return (
        <div className="card-container" onClick={flipCard}>
            <div className={"card-inner " + (isFlipped ? "card-flip" : "")}>
                <div className="card-front">

                </div>
                <div className={"card-back " + (isFound ? "found-card" : "")}>
                    {value}
                </div>
            </div>
        </div>
    )
}

export default Card