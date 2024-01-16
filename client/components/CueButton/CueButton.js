export default function CueButton({player, onCue}) {

    return (
        <button onClick={() => onCue(player)} >Cue</button>
    )
}