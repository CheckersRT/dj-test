import GainKnob from "../GainKnob/GainKnob";
import EqKnob from "../EqKnob/EqKnob";
import VolumeFader from "../VolumeFader/VolumeFader";

export default function Channel({ channel, mixerArray }) {
  return (
    <>
      <GainKnob channel={channel} mixerArray={mixerArray} />
      <EqKnob channel={channel} param={"high"} mixerArray={mixerArray} />
      <EqKnob channel={channel} param={"mid"} mixerArray={mixerArray} />
      <EqKnob channel={channel} param={"low"} mixerArray={mixerArray} />
      {/* <FilterKnob channel={1} mixerArray={mixerArray}/> */}
      <VolumeFader channel={channel} mixerArray={mixerArray} />
    </>
  );
}
