export default function CueButton({player, onCue}) {
    
    return (
        <button onClick={() => onCue()} >Cue</button>
    )
}