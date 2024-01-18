import Channel from "../Channel/Channel";
import Crossfader from "../CrossFader/CrossFader";

export default function Mixer({mixerArray}) {
  return (
    <>
        <Channel channel={1} mixerArray={mixerArray}/>
        <Channel channel={2} mixerArray={mixerArray}/>
        <Crossfader mixerArray={mixerArray}/>
    </>
  );
}
