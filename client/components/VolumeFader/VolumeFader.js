import handleControl from "@/utils/Controls/handleControl";

export default function VolumeFader({ channel, mixerArray }) {
  return (
    <>
      <label htmlFor={`ch${channel}-player-volume`}>Volume</label>
      <input
        name={`ch${channel}-player-volume`}
        id={`ch${channel}-player-volume`}
        type="range"
        min={-20}
        max={20}
        onChange={(event) => handleControl(event.target, "send", mixerArray)}
      />
    </>
  );
}
