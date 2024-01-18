import io from "socket.io-client";
import { socket } from "@/components/Controller/Controller";
import handleGain from "./Controls/handleGain";
import handleCue from "./Controls/handleCue";

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

  socket.on("receive_controlGain", (data) => {
    handleGain(data, "receive", mixerArray, data.channel);
  });

  socket.on("receive_playPause", (data) => {
    let player;
    console.log(data);
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

  socket.on("receive_Cue", (data) => {
    let player;
    console.log(data);
    if (data.player === "playerCh1") {
      player = playerCh1;
    } else if (data.player === "playerCh2") {
      player = playerCh2;
    }
    handleCue(player, "receive");
  });
}

export function socketsOff() {
  socket.off("receive_controlInput");
  socket.off("receive_playPause");
}
