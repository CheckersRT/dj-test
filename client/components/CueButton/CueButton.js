import handleCue from "@/utils/Controls/handleCue"

export default function CueButton({channel, mixerArray}) {

    return (
        <button onClick={() => handleCue(channel, mixerArray)} >Cue</button>
    )
}