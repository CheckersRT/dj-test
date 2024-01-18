import { socket } from "@/components/Player/Player";

export default function handleGain(event, sendReceive, mixerArray, channel) {

    let gainValue;
    if(event.value >= 0) {
        gainValue = event.value/2
    } else if (event.value < 0) {
        gainValue = event.value * 2
    }


    if (sendReceive === "send") {
      socket.emit("send_controlGain", {
        name: event.name,
        value: gainValue,
      });
    }
    // const channel = event.name.split("-")[0];
    const channelCaps = "Ch" + channel;
    const type = event.name.split("-")[1];
    const objectName = type + channelCaps;
    const param = event.name.split("-")[2];
    const nodeObject = mixerArray.current.find(
      (obj) => obj.current.name === objectName
    );

    nodeObject.current[param].value = gainValue;
    console.log(nodeObject.current[param].value);
  }