"use client"
export default function PlayButton({onPlay, player}) {
    console.log("Player: ", player)

    return (
        <button onClick={(event) => onPlay(event)}>Play</button>
        )
}