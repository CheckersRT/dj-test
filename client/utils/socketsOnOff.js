import io from "socket.io-client";
import { socket } from "@/components/Player/Player";

export function socketsOn(
  playerCh1,
  playerCh2,
  handleControl,
  handlePlayPause,
  mixerArray,
  setPlayTime,
  playTime,
  setTimeElapsed,
  timeElapsed
) {

  socket.on("receive_controlInput", (event) => {
    handleControl(event, "receive", mixerArray);
  });

  socket.on("receive_playPause", (data) => {
    let player;
    if (data.player === "playerCh1") {
      player = playerCh1;
    } else if (data.player === "playerCh2") {
      player = playerCh2;
    }
    handlePlayPause(
      player,
      setPlayTime,
      playTime,
      setTimeElapsed,
      timeElapsed,
      "Receive"
    );
  });
}

export function socketsOff() {
  socket.off("receive_controlInput");
  socket.off("receive_playPause");
}
