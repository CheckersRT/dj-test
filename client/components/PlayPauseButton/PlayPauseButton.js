import { handlePlayPause } from "@/utils/Controls/handlePlayPause";
import Player from "../Controller/Controller";

export default function PlayPauseButton({
  player,
  mixerArray,
  setPlayTime,
  playTime,
  setTimeElapsed,
  timeElapsed,
}) {
  return (
    <button
      onClick={() =>
        handlePlayPause(
          player,
          mixerArray,
          setPlayTime,
          playTime,
          setTimeElapsed,
          timeElapsed,
          "send"
        )
      }
    >
      Play/Pause
    </button>
  );
}
