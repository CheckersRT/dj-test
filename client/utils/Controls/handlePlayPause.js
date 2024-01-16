import { socket } from "@/components/Player/Player";

export function handlePlayPause(
  player,
  setPlayTime,
  playTime,
  setTimeElapsed,
  timeElapsed,
  sendReceive
) {

  if(sendReceive === "send") {
    // socket.emit("send_playCh1");
    socket.emit("send_playPause", {player: player.current.name});
}

  if (player.current.state === "stopped") {
    setPlayTime(player.current.context.currentTime);
    
    player.current.start(0, timeElapsed);

  } else if (player.current.state === "started") {
    // if(sendReceive === "send") {
    //   // socket.emit("send_pauseCh1");
    //   socket.emit("send_pause", {player: player.current.name});
    // }
    player.current.stop();
    setTimeElapsed(
      timeElapsed + (player.current.context.currentTime - playTime)
    );
    console.log(timeElapsed)
  }
}

