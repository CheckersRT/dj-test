import Channel from "../Channel/Channel";
import Crossfader from "../CrossFader/CrossFader";
import styles from "./Mixer.module.css";

export default function Mixer({ mixerArray }) {
  return (
    <>
      <div className={styles.columns}>
        <Channel channel={1} mixerArray={mixerArray} />
        <Channel channel={2} mixerArray={mixerArray} />
      </div>
      <Crossfader mixerArray={mixerArray} />
    </>
  );
}
