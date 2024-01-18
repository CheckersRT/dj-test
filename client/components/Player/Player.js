import PlayPauseButton from "@/components/PlayPauseButton/PlayPauseButton";
import CueButton from "../CueButton/CueButton";
import Load from "../Load/Load";
import styles from "./Player.module.css"

export default function player({
  channel,
  audioFile,
  setAudioFile,
  isLoading,
  setIsLoading,
  setAudioUrlCh1,
  setAudioUrlCh2,
  mixerArray,
  player,
  playTime,
  setPlayTime,
  timeElapsed,
  setTimeElapsed,
}) {
  return (
    <div className={styles.container}>
      <Load
        channel={channel}
        audioFile={audioFile}
        setAudioFile={setAudioFile}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setAudioUrlCh1={setAudioUrlCh1}
        setAudioUrlCh2={setAudioUrlCh2}
      />
      <CueButton channel={channel} mixerArray={mixerArray} player={player} />
      <PlayPauseButton
        player={player}
        mixerArray={mixerArray}
        setPlayTime={setPlayTime}
        playTime={playTime}
        setTimeElapsed={setTimeElapsed}
        timeElapsed={timeElapsed}
      />
    </div>
  );
}
