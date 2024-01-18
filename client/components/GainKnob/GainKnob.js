import handleControl from "@/utils/Controls/handleControl"
import handleGain from "@/utils/Controls/handleGain"

export default function GainKnob({channel, mixerArray}) {
    return (
        <>
        <label htmlFor={`ch${channel}-gain-gain`}>gain</label>
        <input
          name={`ch${channel}-gain-gain`}
          id={`ch${channel}-gain-gain`}
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleGain(event.target, "send", mixerArray, channel)}
        />
      </>
    )
}