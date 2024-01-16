"use client"
export default function PlayButton({onPlay, player}) {

    return (
        <button onClick={(event) => onPlay(player)}>Play</button>
        )
}