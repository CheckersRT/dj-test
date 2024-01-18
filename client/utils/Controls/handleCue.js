import { socket } from "@/components/Player/Player";

export default function handleCue(player, sendReceive) {

    if (sendReceive === "send") {
        socket.emit("send_Cue", {
          player: player.current.name
        });
      }    
    player.current.stop()
}