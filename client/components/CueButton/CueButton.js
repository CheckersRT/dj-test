import handleCue from "@/utils/Controls/handleCue"

export default function CueButton({player}) {

    return (
        <button onClick={() => handleCue(player, "send")} >Cue</button>
    )
}