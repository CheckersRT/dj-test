"use client";
export default function PlayPauseButton({
  onPlayPause,
  player,
  setPlayTime,
  playTime,
  setTimeElapsed,
  timeElapsed,
}) {
  return (
    <button
      onClick={(event) =>
        onPlayPause(
          player,
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
