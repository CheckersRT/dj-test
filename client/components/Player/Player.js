"use client";
import PlayPauseButton from "@/components/PlayPauseButton/PlayPauseButton";
import * as Tone from "tone/build/esm";
import { useEffect, useRef, useState } from "react";
import styles from "./Player.module.css";
import io from "socket.io-client";
import setUpAudio from "@/utils/setUpAudio";
import uploadAudio from "@/utils/uploadAudio";
import { socketsOn, socketsOff } from "@/utils/socketsOnOff";
import {
  handlePlay,
  handlePlay2,
  handlePause,
  handlePause2,
} from "@/utils/Controls/handlePlayPause";
import handleStopAll from "@/utils/Controls/handleStopAll";
import handleControl from "@/utils/Controls/handleControl";

export const socket = io.connect("http://localhost:3001");

export default function Player() {
  // STATES
  const [audioFile, setAudioFile] = useState("");
  const [audioUrlCh1, setAudioUrlCh1] = useState("");
  const [audioUrlCh2, setAudioUrlCh2] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const [playTime, setPlayTime] = useState(0);
  const [timeElasped, setTimeElasped] = useState(0);

  // // REFS
  const playerCh1 = useRef();
  const playerCh2 = useRef();
  const playerMaster = useRef();
  const eqCh1 = useRef();
  const eqCh2 = useRef();
  const crossFader = useRef();
  const gainCh1 = useRef();
  const gainCh2 = useRef();
  const filterHpCh1 = useRef();
  const filterHpCh2 = useRef();
  const filterLpCh1 = useRef();
  const filterLpCh2 = useRef();
  const meterCh1 = useRef();
  const meterCh2 = useRef();
  const mixerArray = useRef();

  mixerArray.current = [];
  mixerArray.current.push(
    playerCh1,
    playerCh2,
    playerMaster,
    eqCh1,
    eqCh2,
    crossFader,
    gainCh1,
    gainCh2,
    filterHpCh1,
    filterHpCh2,
    filterLpCh1,
    filterLpCh2
  );

  // AUDIO NODE CHAIN SET UP
  useEffect(() => {
    setUpAudio(
      playerCh1,
      playerCh2,
      playerMaster,
      eqCh1,
      eqCh2,
      gainCh1,
      gainCh2,
      crossFader,
      audioUrlCh1,
      audioUrlCh2
    );
  }, [audioUrlCh1, audioUrlCh2]);

  // LISTEN FOR RECEIVED SOCKETS MESSAGES
  useEffect(() => {
    socketsOn(playerCh1, playerCh2, handleControl, mixerArray);

    return () => {
      socketsOff();
    };
  }, [socket]);

  async function handleSubmit(event) {
    console.log(audioFile);
    event.preventDefault();
    console.log(event.target.name);
    const url = await uploadAudio(audioFile, setIsLoading);
    event.target.name === "player1" && setAudioUrlCh1(url);
    event.target.name === "player2" && setAudioUrlCh2(url);
  }

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
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
        <label htmlFor="ch1-eq-high">High</label>
        <input
          name="ch1-eq-high"
          id="ch1-eq-high"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
        <label htmlFor="ch1-eq-mid">Mid</label>
        <input
          name="ch1-eq-mid"
          id="ch1-eq-mid"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
        <label htmlFor="ch1-eq-low">Low</label>
        <input
          name="ch1-eq-low"
          id="ch1-eq-low"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
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
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
        <PlayPauseButton
          player={playerCh1}
          onPlayPause={handlePlay}
          setPlayTime={setPlayTime}
          playTime={playTime}
          setTimeElasped={setTimeElasped}
          timeElasped={timeElasped}
        />
        <button onClick={() => handlePause(playerCh1)}>Pause</button>

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
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
        <label htmlFor="ch2-eq-high">High</label>
        <input
          name="ch2-eq-high"
          id="ch2-eq-high"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
        <label htmlFor="ch2-eq-mid">Mid</label>
        <input
          name="ch2-eq-mid"
          id="ch2-eq-mid"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
        <label htmlFor="ch2-eq-low">Low</label>
        <input
          name="ch2-eq-low"
          id="ch2-eq-low"
          type="range"
          min={-20}
          max={20}
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
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
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
        <PlayPauseButton onPlayPause={handlePlay2} player={playerCh2} />
        <button onClick={() => handlePause2(playerCh2)}>Pause</button>
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
          onChange={(event) => handleControl(event.target, "send", mixerArray)}
        />
        <button onClick={() => handleStopAll(playerMaster)}>Stop All</button>
      </div>
    </div>
  );
}
