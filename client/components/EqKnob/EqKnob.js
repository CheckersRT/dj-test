import handleControl from "@/utils/Controls/handleControl";

export default function EqKnob({ channel, param, mixerArray }) {

  return (
    <>
      <label htmlFor={`ch${channel}-eq-${param}`}>{param}</label>
      <input
        name={`ch${channel}-eq-${param}`}
        id={`ch${channel}-eq-${param}`}
        type="range"
        min={-20}
        max={20}
        onChange={(event) => handleControl(event.target, "send", mixerArray)}
      />
    </>
  );
}
