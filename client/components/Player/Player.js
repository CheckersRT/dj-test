"use client";
import PlayPauseButton from "@/components/PlayPauseButton/PlayPauseButton";
import * as Tone from "tone/build/esm";
import { useEffect, useRef, useState } from "react";
import styles from "./Player.module.css";
import io from "socket.io-client";
import setUpAudio from "@/utils/setUpAudio";
import uploadAudio from "@/utils/uploadAudio";
import { socketsOn, socketsOff } from "@/utils/socketsOnOff";
import { handlePlayPause } from "@/utils/Controls/handlePlayPause";
import handleStopAll from "@/utils/Controls/handleStopAll";
import handleControl from "@/utils/Controls/handleControl";
import CueButton from "../CueButton/CueButton";
import handleCue from "@/utils/Controls/handleStopAll";
import EqKnob from "../EqKnob/EqKnob";
import GainKnob from "../GainKnob/GainKnob";
import Load from "../Load/Load";
import VolumeFader from "../VolumeFader/VolumeFader";
import FilterKnob from "../FilterKnob/FilterKnob";

export const socket = io.connect("http://localhost:3001");

export default function Player() {
  // STATES
  const [audioFile, setAudioFile] = useState("");
  const [audioUrlCh1, setAudioUrlCh1] = useState("");
  const [audioUrlCh2, setAudioUrlCh2] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const [playTime, setPlayTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

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
    socketsOn(
      playerCh1,
      playerCh2,
      handleControl,
      handlePlayPause,
      mixerArray,
      setPlayTime,
      playTime,
      setTimeElapsed,
      timeElapsed
    );

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

  const channelArray = [
    {
      id: "1",
      channel: ["gain", { eqs: ["high", "mid", "low"] }, "filter", "volume"],
    },
    {
      id: "2",
      channel: ["gain", { eqs: ["high", "mid", "low"] }, "filter", "volume"],
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Load
          channel={1}
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setAudioUrlCh1={setAudioUrlCh1}
          setAudioUrlCh2={setAudioUrlCh2}
        />
        <GainKnob channel={1} mixerArray={mixerArray}/>
        <EqKnob channel={1} param={"high"} mixerArray={mixerArray} />
        <EqKnob channel={1} param={"mid"} mixerArray={mixerArray} />
        <EqKnob channel={1} param={"low"} mixerArray={mixerArray} />
        {/* <FilterKnob channel={1} mixerArray={mixerArray}/> */}
        <VolumeFader channel={1} mixerArray={mixerArray} />
        <CueButton channel={1} mixerArray={mixerArray} />
        <PlayPauseButton
          player={playerCh1}
          mixerArray={mixerArray}
          setPlayTime={setPlayTime}
          playTime={playTime}
          setTimeElapsed={setTimeElapsed}
          timeElapsed={timeElapsed}
        />
        {/* CHANNEL 2 */}
        <Load
          name={`player${channelArray[1].id}`}
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setAudioUrlCh1={setAudioUrlCh1}
          setAudioUrlCh2={setAudioUrlCh2}
        />
        {/* ------------ GAIN ---------------*/}
        <GainKnob channel={channelArray[0].id} mixerArray={mixerArray} />
        {/* ------------ EQS ---------------*/}
        {channelArray[1].channel[1].eqs.map((eq) => (
          <EqKnob
            channel={channelArray[1].id}
            param={eq}
            key={eq}
            mixerArray={mixerArray}
          />
        ))}
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
        <CueButton player={playerCh2} onCue={handleCue} />
        <PlayPauseButton
          player={playerCh2}
          onPlayPause={handlePlayPause}
          setPlayTime={setPlayTime}
          playTime={playTime}
          setTimeElapsed={setTimeElapsed}
          timeElapsed={timeElapsed}
        />
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
