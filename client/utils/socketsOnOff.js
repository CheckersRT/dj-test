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

  let player; 
  socket.on("receive_playPause", (data) => {
    console.log(data)
    if (data.player === "playerCh1") {
      player = playerCh1;
    } else if (data.player === "playerCh2") {
      player = playerCh2;
    }
    handlePlayPause(
      player,
      mixerArray,
      setPlayTime,
      playTime,
      setTimeElapsed,
      timeElapsed,
      "receive"
    );
  });
}

export function socketsOff() {
  socket.off("receive_controlInput");
  socket.off("receive_playPause");
}
