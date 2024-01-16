"use client"
export default function PlayPauseButton({onPlayPause, player, setPlayTime, playTime, setElaspedTime, elaspedTime}) {

    return (
        <button onClick={(event) => onPlayPause(player, setPlayTime, playTime, setElaspedTime, elaspedTime)}>Play</button>
        )
}