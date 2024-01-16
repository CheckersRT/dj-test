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

  console.log("socketsOn is called")
  socket.on("receive_controlInput", (event) => {
    handleControl(event, "receive", mixerArray);
  });

  socket.on("receive_playCh1", () => {
    handlePlayPause(
      playerCh1,
      setPlayTime,
      playTime,
      setTimeElapsed,
      timeElapsed,
      "Receive"
    );
    // playerCh1.current.start();
  });
  socket.on("receive_playCh2", () => {
    playerCh2.current.start();
  });
  socket.on("receive_pauseCh1", () => {
    playerCh1.current.stop();
  });
  socket.on("receive_pauseCh2", () => {
    playerCh2.current.stop();
  });
}

export function socketsOff() {
  socket.off("receive_controlInput");
  socket.off("receive_playCh1");
  socket.off("receive_playCh2");
  socket.off("receive_pauseCh1");
  socket.off("receive_pauseCh2");
}
