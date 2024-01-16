import { socket } from "@/components/Player/Player";

export function handlePlayPause(
  player,
  setPlayTime,
  playTime,
  setTimeElapsed,
  timeElapsed,
  sendReceive
) {
  if (player.current.state === "stopped") {
    setPlayTime(player.current.context.currentTime);
    if(sendReceive === "send") {
        socket.emit("send_playCh1");
    }
    player.current.start(0, timeElapsed);

  } else if (player.current.state === "started") {
    socket.emit("send_pauseCh1");
    player.current.stop();
    setTimeElapsed(
      timeElapsed + (player.current.context.currentTime - playTime)
    );
    console.log(timeElapsed)
  }
}

export function handlePlay2(playerCh2) {
  socket.emit("send_playCh2");
  playerCh2.current.start();
}
export function handlePause(playerCh1) {
  socket.emit("send_pauseCh1");
  playerCh1.current.stop();
}
export function handlePause2(playerCh2) {
  socket.emit("send_pauseCh2");
  playerCh2.current.stop();
}
