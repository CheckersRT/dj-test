import { socket } from "@/components/Controller/Controller";

export default function handleControl(event, sendReceive, mixerArray) {
  if (sendReceive === "send") {
    socket.emit("send_controlInput", {
      name: event.name,
      value: event.value,
    });
  }
  const channel = event.name.split("-")[0];
  const channelCaps = channel.charAt(0).toUpperCase() + channel.slice(1);
  const type = event.name.split("-")[1];
  const objectName = type + channelCaps;
  const param = event.name.split("-")[2];
  const nodeObject = mixerArray.current.find(
    (obj) => obj.current.name === objectName
  );
  nodeObject.current[param].value = event.value;
  console.log(nodeObject.current[param].value);
}
