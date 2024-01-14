"use client";
import PlayButton from "@/components/PlayButton/PlayButton";
import * as Tone from "tone/build/esm";
import { useEffect, useRef, useState } from "react";
import styles from "./Player.module.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
export default function Player({ onChange }) {
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("")
  const [audioFile, setAudioFile] = useState("");
  const [audioUrlCh1, setAudioUrlCh1] = useState("");
  const [audioUrlCh2, setAudioUrlCh2] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const playerCh1 = useRef();
  const playerCh2 = useRef();
  const playerMaster = useRef();
  const eqCh1 = useRef();
  const eqCh2 = useRef();
  const crossFader = useRef();
  const gainCh1 = useRef();
  const gainCh2 = useRef();
  // const filterHpCh1 = useRef();
  // const filterHpCh2 = useRef();
  // const filterLpCh1 = useRef();
  // const filterLpCh2 = useRef();
  const meterCh1 = useRef();
  const meterCh2 = useRef();
  const mixerArray = useRef();

  function sendChange() {
    socket.emit("send_message", { message });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
      // alert(data.message);
    });

    socket.on("receive_controlInput", (event) => {
      const channel = event.target.name.split("-")[0];
      const channelCaps = channel.charAt(0).toUpperCase() + channel.slice(1);
      const type = event.target.name.split("-")[1];
      const objectName = type + channelCaps;
      const param = event.target.name.split("-")[2];
      const nodeObject = mixerArray.current.find(
        (obj) => obj.name === objectName
      );
      nodeObject[param].value = event.target.value;
      console.log(nodeObject[param].value);
  
    })

  }, [socket]);

  useEffect(() => {
    playerMaster.current = new Tone.Players({
      urls: {
        // playerCh1: audioUrlCh1,
        playerCh1: "/Prevail.wav",
        // playerCh2: audioUrlCh2,
        playerCh2: "/DamnFineDay.wav",
      },
      onload: () => {
        console.log("loaded");
      },
    });

    playerCh1.current = playerMaster.current.player("playerCh1");
    playerCh1.current.name = "playerCh1";
    playerCh2.current = playerMaster.current.player("playerCh2");
    playerCh2.current.name = "playerCh2";

    gainCh1.current = new Tone.Gain();
    gainCh1.current.name = "gainCh1";
    gainCh2.current = new Tone.Gain();
    gainCh2.current.name = "gainCh2";
    console.log(gainCh1.current);

    eqCh1.current = new Tone.EQ3();
    eqCh1.current.name = "eqCh1";
    eqCh2.current = new Tone.EQ3();
    eqCh2.current.name = "eqCh2";

    // filterHpCh1.current = new Tone.Filter();
    // filterHpCh1.current.name = "filterHpCh1";
    // filterHpCh2.current = new Tone.Filter();
    // filterHpCh2.current.name = "filterHpCh2";
    // console.log(filterHpCh1);

    // filterLpCh1.current = new Tone.Filter();
    // filterLpCh1.current.name = "filterLpCh1";
    // filterLpCh2.current = new Tone.Filter();
    // filterLpCh2.current.name = "filterLpCh2";
    // console.log(filterLpCh1);

    meterCh1.current = new Tone.Meter();
    meterCh1.current.name = "meterCh1";
    meterCh2.current = new Tone.Meter();
    meterCh2.current.name = "meterCh1";

    crossFader.current = new Tone.CrossFade();
    crossFader.current.name = "crossFaderChAll";
    crossFader.current.toDestination();

    playerCh1.current.chain(
      gainCh1.current,
      eqCh1.current,
      // filterHpCh1.current,
      // filterLpCh1.current,
      crossFader.current.a
    );
    playerCh2.current.chain(
      gainCh2.current,
      eqCh2.current,
      // filterHpCh2.current,
      // filterLpCh2.current,
      crossFader.current.b
    );

    mixerArray.current = [];
    mixerArray.current.push(
      playerCh1.current,
      playerCh2.current,
      gainCh1.current,
      gainCh2.current,
      eqCh1.current,
      eqCh2.current,
      // filterHpCh1.current,
      // filterLpCh1.current,
      // filterHpCh2.current,
      // filterLpCh2.current,
      crossFader.current
    );
  }, [audioUrlCh1, audioUrlCh2]);

  function handlePlay(event) {
    playerCh1.current.start();
  }

  function handlePlay2() {
    playerCh2.current.start();
  }
  function handlePause() {
    playerCh1.current.stop();
  }
  function handlePause2() {
    playerCh2.current.stop();
  }

  function handleStopAll() {
    playerMaster.current.stopAll();
  }

  function handleControl(event, sendReceive) {
    // if(sendReceive === "send") {
      socket.emit("send_controlInput", {event})
    // } 

    const channel = event.target.name.split("-")[0];
    const channelCaps = channel.charAt(0).toUpperCase() + channel.slice(1);
    const type = event.target.name.split("-")[1];
    const objectName = type + channelCaps;
    const param = event.target.name.split("-")[2];
    const nodeObject = mixerArray.current.find(
      (obj) => obj.name === objectName
    );
    nodeObject[param].value = event.target.value;
    console.log(nodeObject[param].value);

  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = await uploadAudio();
    console.log(event.target.name);
    event.target.name === "player1" && setAudioUrlCh1(url);
    event.target.name === "player2" && setAudioUrlCh2(url);
  }

  const CLOUD_NAME = "dm1n4kfee";
  const UPLOAD_PRESET = "y0myraqm";

  const uploadAudio = async () => {
    if (!audioFile) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      const url = data.secure_url;
      console.log(url);
      setIsLoading(false);
      return data.secure_url;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return null;
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form name="player1" onSubmit={handleSubmit}>
          <label htmlFor="image">Deck 1</label>
          <input
            id="image"
            type="file"
            onChange={(event) =>
              event.target ? setAudioFile(event.target.files[0]) : null
            }
          />
          <button type="submit">Load</button>
        </form>
        {isLoading && <p>Loading track...</p>}
        <label htmlFor="ch1-gain-gain">Gain</label>
        <input
          name="ch1-gain-gain"
          id="ch1-gain-gain"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event)}
        />
        <label htmlFor="ch1-eq-high">High</label>
        <input
          name="ch1-eq-high"
          id="ch1-eq-high"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event)}
        />
        <label htmlFor="ch1-eq-mid">Mid</label>
        <input
          name="ch1-eq-mid"
          id="ch1-eq-mid"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event)}
        />
        <label htmlFor="ch1-eq-low">Low</label>
        <input
          name="ch1-eq-low"
          id="ch1-eq-low"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event)}
        />
        {/* <label htmlFor="ch1-filter-frequency">Filter</label>
        <input
          name="ch1-filter-frequency"
          id="ch1-filter-frequency"
          type="range"
          min={40}
          max={5000}
          onChange={(event) => handleControl(event)}
        /> */}
        <label htmlFor="ch1-player-volume">Volume</label>
        <input
          name="ch1-player-volume"
          id="ch1-player-volume"
          type="range"
          min={-20}
          max={10}
          step={1}
          onChange={(event) => handleControl(event)}
        />
        <PlayButton onPlay={handlePlay} />
        <button onClick={handlePause}>Pause</button>

        {/* CHANNEL 2 */}
        <form name="player2" onSubmit={handleSubmit}>
          <label htmlFor="image">Deck 2</label>
          <input
            id="image"
            type="file"
            onChange={(event) =>
              event.target ? setAudioFile(event.target.files[0]) : null
            }
          />
          <button type="submit">Load</button>
        </form>
        <label htmlFor="ch2-gain-gain">Gain</label>
        <input
          name="ch2-gain-gain"
          id="ch2-gain-gain"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event)}
        />
        <label htmlFor="ch2-eq-high">High</label>
        <input
          name="ch2-eq-high"
          id="ch2-eq-high"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event)}
        />
        <label htmlFor="ch2-eq-mid">Mid</label>
        <input
          name="ch2-eq-mid"
          id="ch2-eq-mid"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event)}
        />
        <label htmlFor="ch2-eq-low">Low</label>
        <input
          name="ch2-eq-low"
          id="ch2-eq-low"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event)}
        />
        {/* <label htmlFor="ch2-filter-frequency">Filter</label>
        <input
          name="ch2-filter-frequency"
          id="ch2-filter-frequency"
          type="range"
          min={40}
          max={5000}
          onChange={(event) => handleControl(event)}
        /> */}
        <label htmlFor="ch2-player-volume">Vol</label>
        <input
          name="ch2-player-volume"
          id="ch2-player-volume"
          type="range"
          min={-20}
          max={10}
          step={1}
          onChange={(event) => handleControl(event)}
        />
        <PlayButton onPlay={handlePlay2} />
        <button onClick={handlePause2}>Pause</button>
      </div>
      <div className={styles.crossfader}>
        <label htmlFor="chAll-crossFader-fade">Crossfader</label>
        <input
          name="chAll-crossFader-fade"
          id="chAll-crossFader-fade"
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={(event) => handleControl(event)}
        />
        <button onClick={handleStopAll}>Stop All</button>
      </div>
      {/* <label htmlFor="test">Test</label>
      <input type="text" id="test" onChange={(event) => setMessage(event.target.value)}/>
      <button onClick={sendChange}>Send</button>
      <h2>Message:</h2>
      <p>{messageReceived}</p> */}
    </div>
  );
}
