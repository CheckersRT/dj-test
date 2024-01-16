import handleControl from "@/utils/Controls/handleControl"

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
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
      </>
    )
}