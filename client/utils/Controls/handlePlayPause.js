import { socket } from "@/components/Player/Player";

export function handlePlay(player, setPlayTime, playTime, setElaspedTime, elaspedTime) {
  
  
    socket.emit("send_playCh1");
  player.current.start();
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
