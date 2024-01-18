import handleControl from "@/utils/Controls/handleControl";

export default function Crossfader({ mixerArray }) {
  return (
    <>
      <label htmlFor="chAll-crossFader-fade">Crossfader</label>
      <input
        name="chAll-crossFader-fade"
        id="chAll-crossFader-fade"
        type="range"
        min={0}
        max={1}
        step={0.01}
        onChange={(event) => handleControl(event.target, "send", mixerArray)}
      />
    </>
  );
}
