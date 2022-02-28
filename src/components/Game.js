import { useEffect, useState } from "react"
import Card from "./Card"
import '../css/game.css'

const Game = () => {
    const [playing, setPlaying] = useState(false)
    const [range, setRange] = useState(["1", "10"])
    const [playingCards, setPlayingCards] = useState([])
    const [foundCards, setFoundCards] = useState([])
    const [currentlyFlipped, setCurrentlyFlipped] = useState([])
    const [turns, setTurns] = useState(0)

    useEffect(() => {
        if (currentlyFlipped.length === 2) {
            if (playingCards[currentlyFlipped[0]] === playingCards[currentlyFlipped[1]])
                setFoundCards(foundCards => [...foundCards, ...currentlyFlipped])

            setTimeout(() => {
                setCurrentlyFlipped([])
            }, 1000)

            setTurns(turns => turns + 1)
        }
    }, [currentlyFlipped])

    useEffect(() => {
        if (playing && foundCards.length === playingCards.length)
            setTimeout(alert, 300, `You won in ${turns} turns!`)
    }, [playing, foundCards])

    /*useEffect(() => {
        if (playingCards.length > 0)
            setPlaying(true)
    }, [playingCards])*/

    const startGame = () => {
        const pc = generatePlayingCards(...range)
        setPlayingCards(pc)
        console.log(pc)
        setPlaying(true)
    }

    const handleInputChange = (e, index) => {
        let newRange = range.slice()
        newRange[index] = e.target.value
        setRange(newRange)
    }

    const generatePlayingCards = (start, end) => {
        const playingCards = []

        for (let i = start; i <= end; i++) {
            playingCards.push(i)
            playingCards.push(i)
        }

        playingCards.sort(() => Math.random() - 0.5)

        return playingCards
    }


    return (
        <div className="game-container">
            {playing &&
                <>
                    <div className="score-container">
                        Turns played: {turns}
                    </div>
                    <div className="cards-container">
                        {
                            playingCards.map((card, index) => {
                                return <Card key={index}
                                    index={index}
                                    value={card}
                                    currentlyFlipped={currentlyFlipped}
                                    foundCards={foundCards}
                                    setCurrentlyFlipped={{ setCurrentlyFlipped }} />
                            })
                        }
                    </div>
                </>
            }
            {!playing &&
                <div className="menu-container">
                    <input type="text"
                        placeholder="1"
                        value={range[0]}
                        onChange={e => handleInputChange(e, 0)}
                    />
                    <input type="text"
                        placeholder="10"
                        value={range[1]}
                        onChange={e => handleInputChange(e, 1)}
                    />

                    <div className="flex-break" />

                    <button onClick={startGame}>
                        New Game
                    </button>
                </div>
            }
        </div>

    )
}

export default Game