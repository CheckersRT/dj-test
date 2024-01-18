export default function handleCue(channel, mixerArray) {
    const player = "playerCh" + channel
    
    const playerObject = mixerArray.current.find((obj) => obj.current.name === player)
    playerObject.current.stop()
}